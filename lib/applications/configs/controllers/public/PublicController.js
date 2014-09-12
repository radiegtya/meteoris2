/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

PublicController = RouteController.extend({
    deps: new Tracker.Dependency,
    id: null,
    criteria: {},
    increment: 15,
    breadcrumbs: null,
    subs: new SubsManager({
        // maximum number of cache subscriptions
        cacheLimit: 50,
        // any subscription will be expire after 60 minute, if it's not subscribed again
        expireIn: 60
    }),
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
    getProfileName: function(userId) {
        var name = "";
        var user = Meteor.users.findOne(userId);
        if (user) {
            name = user.profile.firstname + " " + user.profile.lastname;
        }
        return name;
    },
    errorMessage: function(collections, field) {
        var namedContext = collections.simpleSchema().namedContext();
        var result = "";
        namedContext.invalidKeys().forEach(function(i) {
            if (i.name == field)
                result = namedContext.keyErrorMessage(i.name);
        });
        return result;
    },
    formatDate: function(date) {
        if (date)
            return moment(date).format('DD MMM YYYY');
        else
            return "-";
    },
    formatDateTime: function(date) {
        if (date)
            return moment(date).format('DD MMM YYYY HH:mm');
        else
            return "-";
    },
    getGender: function(gender) {
        if (gender == "male")
            return "Laki-laki";
        else if (gender == "female")
            return "Perempuan";
        else
            "";
    },
    getBeginningDate: function() {
        var day = "01";
        var month = "01";
        var year = new Date().getFullYear();
        var beginningDate = year + "-" + month + "-" + day;
        return beginningDate;
    },
    combodateFormat: function(date) {
        if (date)
            return moment(date).format("YYYY-MM-DD");
        else
            return moment(new Date()).format("YYYY-MM-DD");
    },
    combodateEmptyFormat: function(date) {
        if (date)
            return moment(date).format("YYYY-MM-DD");
    },
    formatNumber: function(value) {
        if (value === 0)
            return 0;
        else if (value < 0) //accounting format when number is negative
            return "(" + accounting.formatMoney(value * -1, "", 2, ".", ",") + ")";
        else if (value)
            return accounting.formatMoney(value, "", 2, ".", ",");
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

        PiyikuFlash.run('success', 'Email successfully sent');
    },
    renderLayout: function() {
        var layout = function() {
            var htmlHeight = $('html').height();
            var navbarHeight = $('.navbar-fixed-top').height();
            var footerHeight = $('.footer').height();
            var contentHeight = htmlHeight - navbarHeight - footerHeight;
            $('aside').css('height', contentHeight);
            $('.main').css('height', contentHeight);
            $('body > .aside-container')
                    .css('height', contentHeight)
                    .css('margin-top', navbarHeight);
            $('body > .main-container')
                    .css('height', contentHeight)
                    .css('margin-top', navbarHeight);
            $('.panel-search')
                    .css('height', contentHeight)
                    .css('margin-top', navbarHeight);
            $('.panel-right')
                    .css('height', contentHeight)
                    .css('margin-top', navbarHeight);

            $("aside").niceScroll({
                autohidemode: false
            });

        };

        layout();

        $(window).resize(function() {
            layout();
        });
    },
    isAllow: function(action) {
        var collection = this.route.name;
        collection = collection.replace("Index", "");
        Meteor.call('publicGetAuth', collection, action, function(err, result) {
            Session.set(action + 'publicGetAuthReturn', result);
        });
        return Session.get(action + 'publicGetAuthReturn');
    },
});