MugenRoleGroupsController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();

        this.subs.subscribe('users', this.getCriteriaUsers(), sort);
        this.subscription = this.subs.subscribe('mugenRoleGroups', this.getCriteria(), sort);
    },
    /* event searching data by user input with parameter */
    search: function(t) {
        Router.go('mugenRoleGroupsIndex', {limit: this.limit()}, {query: "q=" + t.find('#search').value});
    },
    /* event searching data by user input with parameter */
    searchUser: function(t) {
        Router.go(Router.current().route.getName(), {_id: this.getId(), limit: this.limit()}, {query: "q=" + t.find('#search').value});
    },
    /* @override getCriteria */
    getCriteria: function() {
        var search = this.params.query.q ? this.params.query.q : "";
        return {
            $or: [
                {name: {$regex: search, $options: 'i'}},
            ]
        };
    },
    getCriteriaUsers: function() {
        var search = this.params.query.q ? this.params.query.q : "";
        return {
            'profile.mugenRoleGroupId': this.getId(),
            $or: [
                {'profile.name': {$regex: search, $options: 'i'}},
                {'emails.address': {$regex: search, $options: 'i'}},
            ]
        };
    },
    index: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = MugenRoleGroups.find(this.getCriteria(), sort);

        return this.render('mugenRoleGroupsIndex', {
            data: {
                ready: this.subscription.ready,
                isEmpty: models.count() === 0 ? true : false,
                models: models,
                hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
            }
        });
    },
    view: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var users = Meteor.users.find(this.getCriteriaUsers(), sort);

        return this.render('mugenRoleGroupsView', {
            data: {
                ready: this.subscription.ready,
                model: this._loadModel(this.getId()),
                isEmpty: users.count() === 0 ? true : false,
                users: users,
                hasMore: this.limit() == users.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
            }
        });
    },
    /* private get user input docs */
    _getDoc: function(t) {
        return {
            name: t.find('#name').value,
        };
    },
    /* uploading file using cfs:fileSystem package + cfs:ejson */
    _uploadImage: function() {
        var imageId = null;
        var file = $('#image').get(0).files[0];
        if (file) {
            var image = Images.insert(file, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
            });
            imageId = image._id;
        }

        return imageId;
    },
    /* event inserting data */
    insert: function(t) {
        if (this._post) {
            //uploading file using cfs:fileSystem package + cfs:ejson
            //var imageId = this._uploadImage();

            //set inserted doc
            var doc = this._getDoc(t);
            //doc.imageId = imageId;

            var mugenRoleGroup = MugenRoleGroups.findOne(doc);
            if (mugenRoleGroup) {
                var errMessage = "Mugen Role Groups name must be unique";
                MeteorisFlash.set('danger', errMessage);
                throw new Meteor.Error(errMessage);
            } else {
                MugenRoleGroups.insert(doc, function(err, _id) {
                    if (err) {
                        MeteorisFlash.set('danger', err.message);
                        throw new Meteor.Error(err);
                    }
                    MeteorisFlash.set('success', "Success Inserting MugenRoleGroups");
                    Router.go('mugenRoleGroupsView', {_id: _id});
                });
            }
        }
        return this.render('mugenRoleGroupsInsert', {});
    },
    /* event updating data */
    update: function(t) {
        var _id = this.getId();
        var model = this._loadModel(_id);

        if (this._post) {
            //uploading file using cfs:fileSystem package + cfs:ejson
            //var imageId = this._uploadImage();

            //remove old image if user inputting new image        
            //if (imageId && model.imageId)
            //Images.remove(model.imageId);

            //set updated doc
            var doc = this._getDoc(t);
            //doc.imageId = imageId ? imageId : model.imageId;

            MugenRoleGroups.update(_id, {$set: doc}, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Updating MugenRoleGroups");
            });
            Router.go('mugenRoleGroupsView', {_id: _id});
        }
        return this.render('mugenRoleGroupsUpdate', {
            data: {
                model: model,
            }
        });
    },
    /* event removing data by id */
    remove: function(_id) {
        MugenRoleGroups.remove(_id, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Removing MugenRoleGroups");
        });
    },
    _loadModel: function(_id) {
        return MugenRoleGroups.findOne(_id);
    },
});