WorkshopsController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();

        this.subs.subscribe('speakers', {}, {sort: {name: 1}});
        this.subs.subscribe('workshopsSpeakers', this.getCriteriaWorkshopsSpeakers(), sort);
        this.subs.subscribe('downloads', this.getCriteriaDownloads(), sort);
        this.subscription = this.subs.subscribe('workshops', this.getCriteria(), sort);
    },
    /* event searching data by user input with parameter */
    search: function(t) {
        Router.go(Router.current().route.getName(), {limit: this.limit()}, {query: "q=" + t.find('#search').value});
    },
    /* @override getCriteria */
    getCriteria: function() {
        var search = this.params.query.q ? this.params.query.q : "";
        return {
            $or: [
                {name: {$regex: search, $options: 'i'}},
                {summary: {$regex: search, $options: 'i'}},
                {isActive: {$regex: search, $options: 'i'}},
            ]
        };
    },
    getCriteriaWorkshopsSpeakers: function() {
        return {
            workshopId: this.getId(),
        };
    },
    getCriteriaDownloads: function() {
        return {
            workshopId: this.getId(),
        };
    },
    index: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = Workshops.find(this.getCriteria(), sort);

        return this.render('workshopsIndex', {
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
        var workshopsSpeakers = WorkshopsSpeakers.find(this.getCriteriaWorkshopsSpeakers(), sort);
        var downloads = Downloads.find(this.getCriteriaDownloads(), sort);

        return this.render('workshopsView', {
            data: {
                model: this._loadModel(this.getId()),
                ready: this.subscription.ready,
                isEmptyWorkshopsSpeakers: workshopsSpeakers.count() === 0 ? true : false,
                workshopsSpeakers: workshopsSpeakers,
                hasMoreWorkshopsSpeakers: this.limit() == workshopsSpeakers.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
                isEmptyDownloads: downloads.count() === 0 ? true : false,
                downloads: downloads,
                hasMoreDownloads: this.limit() == downloads.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
            }
        });
    },
    /* private get user input docs */
    _getDoc: function(t) {
        return {
            name: t.find('#name').value,
            summary: $('#summary').code(),
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
            //deactivate another workshop before activating a new one
            var activeWorkshop = Workshops.findOne({isActive: true});
            if (activeWorkshop) {
                Workshops.update(activeWorkshop._id, {$set: {isActive: false}});
            }

            //uploading file using cfs:fileSystem package + cfs:ejson
            //var imageId = this._uploadImage();

            //set inserted doc
            var doc = this._getDoc(t);
            doc.isActive = true; //set the latest workshop isActivate to true
            //doc.imageId = imageId;

            Workshops.insert(doc, function(err, _id) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Inserting Workshops");
                Router.go('workshopsView', {_id: _id});
            });
        }
        return this.render('workshopsInsert', {});
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

            Workshops.update(_id, {$set: doc}, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Updating Workshops");
            });
            Router.go('workshopsView', {_id: _id});
        }
        return this.render('workshopsUpdate', {
            data: {
                model: model,
            }
        });
    },
    /* event removing data by id */
    remove: function(_id) {
        Workshops.remove(_id, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Removing Workshops");
        });
    },
    activate: function(_id) {
        //deactivate another workshop before activating a new one
        var activeWorkshop = Workshops.findOne({isActive: true});
        if (activeWorkshop) {
            Workshops.update(activeWorkshop._id, {$set: {isActive: false}});
        }

        Workshops.update(_id, {$set: {isActive: true}}, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Activating Workshops");
        });
    },
    deactivate: function(_id) {
        Workshops.update(_id, {$set: {isActive: false}}, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Deactivating Workshops");
        });
    },
    _loadModel: function(_id) {
        return Workshops.findOne(_id);
    },
    insertWorkshopSpeaker: function(t) {
        var doc = {
            workshopId: this.getId(),
            speakerId: t.find('#speakerId').value
        };

        var model = WorkshopsSpeakers.findOne(doc);
        if (model) {
            var errMessage = "Pembicara tidak dapat dimasukkan 2 kali";
            MeteorisFlash.set('danger', errMessage);
            throw new Meteor.Error(errMessage);
        }

        WorkshopsSpeakers.insert(doc, function(err, _id) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Inserting Speaker");
        });
    },
    removeWorkshopSpeaker: function(_id) {
        WorkshopsSpeakers.remove(_id, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Removing Workshop Speaker");
        });
    },
    /* uploading file using cfs:fileSystem package + cfs:ejson */
    _uploadFile: function() {
        var fileId = null;
        var file = $('#file').get(0).files[0];
        if (file) {
            var file = Files.insert(file, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
            });
            fileId = file._id;
        }

        return fileId;
    },
    insertDownload: function(t) {
        //uploading file using cfs:fileSystem package + cfs:ejson
        var fileId = this._uploadFile();

        //set inserted doc
        var doc = {
            workshopId: this.getId(),
            name: t.find('#name').value,
        };
        doc.isActive = true; //set the latest workshop isActivate to true
        doc.fileId = fileId;

        Downloads.insert(doc, function(err, _id) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Berhasil menambah file unduhan");
        });
    },
    removeDownload: function(_id) {
        Downloads.remove(_id, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Berhasil menghapus file unduhan");
        });
    },
});