/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

MeteorisController = RouteController.extend({
    deps: new Tracker.Dependency,
    id: null,
    criteria: {},
    increment: 15,
    breadcrumbs: null,
    _post: false,
    subs: new SubsManager({
        // maximum number of cache subscriptions
        cacheLimit: 50,
        // any subscription will be expire after 60 minute, if it's not subscribed again
        expireIn: 60
    }),
    onBeforeAction: function() {
        this.getRoles();
        this.next();
    },
    /* RBAC for meteoris */
    getRoles: function() {
        var path = Iron.Location.get().path;
        var res = path.split("/");
        var collection = res[1];
        var action = res[2] ? res[2] : "index";

        Meteor.call('MugenRoleActions.getRoles', collection, action, function(err, result) {
            if (err)
                MeteorisFlash.set('danger', err);
            else {
                if (!result)
                    Router.go('forbidden');
            }
        });
    },
    setId: function(id) {
        this.id = id;
        this.deps.changed();
    },
    getId: function() {
        this.deps.depend();
        return this.params._id ? this.params._id : this.id;
    },
    setBreadcrumbs: function(breadcrumbs) {
        this.breadcrumbs = breadcrumbs;
        this.deps.changed();
    },
    getBreadcrumbs: function() {
        this.deps.depend();
        return this.breadcrumbs;
    },
    setCriteria: function(criteria) {
        this.criteria = criteria;
        this.deps.changed();
    },
    getCriteria: function() {
        this.deps.depend();
        return this.criteria;
    },
    limit: function() {
        return parseInt(this.params.limit) || this.increment;
    },
    sendEmail: function() {
        var host = document.location.host;
        var user = Meteor.users.findOne(Meteor.userId());
        var email = user.emails[0].address;
        var url = host + '/usersActivation/' + user._id + '/' + user.profile.activationCode;
        var html = 'Click Here to Activate Your Email Address <a href="' + url + '">' + url + '</a>';

        Meteor.call('sendEmail', {
            to: email,
            from: 'no-reply@avocadofloat.com',
            subject: 'Activate Your Avocado Float Account',
            text: 'Organize Your Document as Sweet as Avocado Float',
            html: html,
        });

        MeteorisFlash.run('success', 'Email successfully sent');
    },
});