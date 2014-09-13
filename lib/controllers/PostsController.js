PostsController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    onBeforeAction: function() {
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
    /* private clear form */
    _clearForm: function() {
        $('#posts_form')[0].reset();
    },
    /* event inserting data */
    insert: function(t) {
        var _id = Posts.insert(this._getDoc(t), function(err) {
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
        Posts.update(_id, {$set: this._getDoc(t)}, function(err) {
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
        Posts.remove(_id, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Removing Posts");
        });
    },
    /* event searching data by user input */
    search: function(t) {
        this.setCriteria({
            $or: [
                {title: {$regex: t.find('#search').value, $options: 'i'}},
                {content: {$regex: t.find('#search').value, $options: 'i'}},
            ]
        });
    }
});