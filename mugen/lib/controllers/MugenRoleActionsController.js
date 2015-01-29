MugenRoleActionsController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();

        this.subs.subscribe('mugenRoleGroups', {});
        this.subs.subscribe('mugenRoleCollections', {});
        this.subs.subscribe('mugenRoleActions', this.getCriteriaManage(), sort);
        this.subscription = this.subs.subscribe('mugenRoleActions', this.getCriteria(), sort);
    },
    /* event searching data by user input with parameter */
    search: function(t) {
        Router.go(Router.current().route.getName(), {limit: this.limit()}, {
            query: "q=" + t.find('#search').value +
                    "&mugenRoleCollectionId=" + t.find('#mugenRoleCollectionId').value +
                    "&mugenRoleGroupId=" + t.find('#mugenRoleGroupId').value
        });
    },
    /* event searching data by user input with parameter */
    searchManage: function(t) {
        var mugenRoleCollectionId = t.find('#mugenRoleCollectionId').value;
        var mugenRoleGroupId = t.find('#mugenRoleGroupId').value;

        if (!mugenRoleCollectionId || !mugenRoleGroupId) {
            var errMessage = "Please choose mugen collection and group from search criteria";
            MeteorisFlash.set('danger', errMessage);
            throw new Meteor.Error(errMessage);
        }

        Router.go(Router.current().route.getName(), {limit: this.limit()}, {
            query: "mugenRoleCollectionId=" + mugenRoleCollectionId +
                    "&mugenRoleGroupId=" + mugenRoleGroupId
        });
    },
    /* @override getCriteria */
    getCriteria: function() {
        var search = this.params.query.q ? this.params.query.q : "";
        var mugenRoleCollectionId = this.params.query.mugenRoleCollectionId ? this.params.query.mugenRoleCollectionId : "";
        var mugenRoleGroupId = this.params.query.mugenRoleGroupId ? this.params.query.mugenRoleGroupId : "";
        return {
            $or: [
                {name: {$regex: search, $options: 'i'}},
                {mugenRoleGroupId: {$regex: mugenRoleGroupId, $options: 'i'}},
                {mugenRoleCollectionId: {$regex: mugenRoleCollectionId, $options: 'i'}},
            ]
        };
    },
    /* @override getCriteria */
    getCriteriaManage: function() {
        var mugenRoleCollectionId = this.params.query.mugenRoleCollectionId;
        var mugenRoleGroupId = this.params.query.mugenRoleGroupId;
        return {
            mugenRoleGroupId: mugenRoleGroupId == '*' ? {$exists: false} : mugenRoleGroupId,
            mugenRoleCollectionId: mugenRoleCollectionId,
        };
    },
    index: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = MugenRoleActions.find(this.getCriteria(), sort);

        return this.render('mugenRoleActionsIndex', {
            data: {
                ready: this.subscription.ready,
                isEmpty: models.count() === 0 ? true : false,
                models: models,
                hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
            }
        });
    },
    manage: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = MugenRoleActions.find(this.getCriteriaManage(), sort);

        return this.render('mugenRoleActionsManage', {
            data: {
                ready: this.subscription.ready,
                isEmpty: models.count() === 0 ? true : false,
                models: models,
                hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
            }
        });
    },
    view: function() {
        return this.render('mugenRoleActionsView', {
            data: {
                model: this._loadModel(this.getId()),
            }
        });
    },
    /* private get user input docs */
    _getDoc: function(t) {
        var doc = {
            name: t.find('#name').value,
            mugenRoleCollectionId: t.find('#mugenRoleCollectionId').value,
        };
        var mugenRoleGroupId = t.find('#mugenRoleGroupId').value;
        if (mugenRoleGroupId != "*" && mugenRoleGroupId)
            doc.mugenRoleGroupId = mugenRoleGroupId;
        return doc;
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

            //mugenRoleActions must be unique
            var mugenRoleActions = MugenRoleActions.findOne(doc);
            if (mugenRoleActions) {
                var errMessage = "Mugen Role Actions name must be unique";
                MeteorisFlash.set('danger', errMessage);
                throw new Meteor.Error(errMessage);
            } else {
                MugenRoleActions.insert(doc, function(err, _id) {
                    if (err) {
                        MeteorisFlash.set('danger', err.message);
                        throw new Meteor.Error(err);
                    }
                    MeteorisFlash.set('success', "Success Inserting MugenRoleActions");
                    Router.go('mugenRoleActionsView', {_id: _id});
                });
            }
        }
        return this.render('mugenRoleActionsInsert', {});
    },
    insertManage: function(t) {
        var doc = this._getDoc(t);
        var mugenRoleActions = MugenRoleActions.findOne(doc);
        if (mugenRoleActions) {
            var errMessage = "Mugen Role Actions name must be unique";
            MeteorisFlash.set('danger', errMessage);
            throw new Meteor.Error(errMessage);
        } else {
            MugenRoleActions.insert(doc, function(err, _id) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Inserting MugenRoleActions");
            });
        }
        t.find('#name').value = "";
        t.find('#name').focus();
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

            MugenRoleActions.update(_id, {$set: doc}, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Updating MugenRoleActions");
            });
            Router.go('mugenRoleActionsView', {_id: _id});
        }
        return this.render('mugenRoleActionsUpdate', {
            data: {
                model: model,
            }
        });
    },
    /* event removing data by id */
    remove: function(_id) {
        MugenRoleActions.remove(_id, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Removing MugenRoleActions");
        });
    },
    _loadModel: function(_id) {
        return MugenRoleActions.findOne(_id);
    },
});