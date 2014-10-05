PostsController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    waitOn: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();

        return [
            this.subs.subscribe('posts', this.getCriteria(), sort),            
        ];
    },
    /* passing data from controllers to view */
    data: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = Posts.find(this.getCriteria(), sort);

        return {
            isEmpty: models.count() === 0 ? true : false,
            models: models,
            images: Images.find(),
            model: this.getId() ? Posts.findOne(this.getId()) : null,
            hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
        };
    },
    /* private get user input docs */
    _getDoc: function(t) {
        return {
            title: t.find('#title').value,
            content: t.find('#content').value,
        };
    },
    /* uploading file using cfs:fileSystem package + cfs:ejson */
    _uploadImage: function() {
        var imageId = null;
        var file = $('#image').get(0).files[0];
        if (file)
            imageId = Images.insert(file)._id;

        return imageId;
    },
    /* event inserting data */
    insert: function(t) {
        //uploading file using cfs:fileSystem package + cfs:ejson
        var imageId = this._uploadImage();

        //set inserted doc
        var doc = this._getDoc(t);
        doc.imageId = imageId;

        var _id = Posts.insert(doc, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Inserting Posts");
        });
        Router.go('postsView', {_id: _id});
    },
    /* event updating data */
    update: function(t) {
        var _id = this.getId();

        //get post detail
        var model = Posts.findOne(_id);

        //uploading file using cfs:fileSystem package + cfs:ejson
        var imageId = this._uploadImage();

        //remove old image if user inputting new image        
        if (imageId && model.imageId)
            Images.remove(model.imageId);

        //set inserted doc
        var doc = this._getDoc(t);
        doc.imageId = imageId ? imageId : model.imageId;

        Posts.update(_id, {$set: doc}, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Updating Posts");
        });

        Router.go('postsView', {_id: _id});
    },
    /* event removing data by id */
    remove: function(_id) {
        //get post detail
        var model = Posts.findOne(_id);

        //remove oldImage
        var oldImageId = model.imageId;
        Images.remove(oldImageId);

        Posts.remove(_id, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Removing Posts");
        });
    },
    /* event searching data by user input with parameter */
    search: function(t) {
        Router.go('postsIndex', {limit: this.limit(), search: t.find('#search').value});
    },
    /* @override getCriteria */
    getCriteria: function() {
        var search = this.params.search ? this.params.search : "";
        return {
            $or: [
                {title: {$regex: search, $options: 'i'}},
                {content: {$regex: search, $options: 'i'}},
            ]
        };
    },
});