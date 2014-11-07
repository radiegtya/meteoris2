/**
 * configuring router
 * set layoutTemplate to layout template (you can look layout template at client/views/index.html)
 * set every partial template / called yieldTemplates to choosen template (you can look templates at client/templates)
 * set loading template from templates folder too
 */
Router.configure({
    layoutTemplate: 'basic', //set default layout to basic
    yieldTemplates: {
        'templateBasicHeader': {to: 'templateBasicHeader'},
        'templateBasicFooter': {to: 'templateBasicFooter'},
    },
    notFoundTemplate: 'templatePublicNotFound',
    loadingTemplate: 'templatePublicLoading',
});

/**
 * require login, if user logged in then call loading template else back to login page
 */
var requireLogin = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn())
            this.render('templatePublicLoading');
        else
            Router.go('usersLogin');
    } else {
        this.next();
    }
}

Router.onBeforeAction(requireLogin, {
    except: [
        'sitesIndex',
        'postsIndex',
        'postsView',
        'usersRegister',
        'usersLogin',
    ]
});


/**
 * Mapping every router
 */

/* DASHBOARDS */
Router.route('/', {
    name: 'sitesIndex',
    controller: SitesController,
});
/* EOF DASHBOARDS */

/* USERS */
Router.route('users/register/', {
    name: 'usersRegister',
    controller: UsersController,
});
Router.route('users/login/', {
    name: 'usersLogin',
    controller: UsersController,
});
/* EOF USERS */