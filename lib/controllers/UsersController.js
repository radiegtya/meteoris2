UsersController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    onBeforeAction: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();

        return [
            this.subs.subscribe('users', this.getCriteria(), sort),
        ];
    },
    /* passing data from controllers to view */
    data: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = Meteor.users.find(this.getCriteria(), sort);

        return {
            isEmpty: models.count() === 0 ? true : false,
            models: models,
            model: this.getId() ? Meteor.users.findOne(this.getId()) : null,
            hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
        };
    },
    /* private get user input docs */
    _getDoc: function(t) {
        return {
            name: t.find('#name').value,
        };
    },
    /* private clear form */
    _clearForm: function() {
        $('#posts_form')[0].reset();
    },
    /* event inserting data */
    insert: function(t) {
        Meteor.users.insert(this._getDoc(t), function(err) {
            if (err) {
                MeteorisFlash.set('danger', err);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Inserting Posts");
        });
        this._clearForm();
    },
    /* event updating data */
    update: function(t) {
        Meteor.users.update(this.getId(), {$set: this._getDoc(t)}, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Updating Posts");
        });
        this._clearForm();
    },
    /* event removing data by id */
    remove: function(_id) {
        Meteor.users.remove(_id, function(err) {
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
            name: {$regex: t.find('#name').value, $options: 'i'},
        });
    },
    login: function(t) {
        var email = t.find('#email').value;
        var password = t.find('#password').value;

        Meteor.loginWithPassword(email, password, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.reason);
            } else {
                MeteorisFlash.set('success', 'login success');
                Router.go('/');                
            }
        });
    },
    register: function(t) {
        var email = t.find('#email').value;
        var password = t.find('#password').value;
        var name = t.find('#name').value;
        var doc = {
            email: email,
            password: password,
            profile: {
                name: name,
                createdDate: new Date(TimeSync.serverTime()),
                updatedDate: new Date(TimeSync.serverTime()),
            }
        };
        
        Accounts.createUser(doc, function(err){
            if (err) {
                MeteorisFlash.set('danger', err);
                throw new Meteor.Error(err);
            } else {
                MeteorisFlash.set('success', 'register success');
                Router.go('/');                
            }
        });
    }
});