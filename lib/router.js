/**
 * configuring router
 * set layoutTemplate to layout template (you can look layout template at client/views/index.html)
 * set every partial template / called yieldTemplates to choosen template (you can look templates at client/templates)
 * set loading template from templates folder too
 */
Router.configure({
    layoutTemplate: 'frontend', //set default layout to frontend
    yieldTemplates: {
        'meteorisFlash': {to: 'meteorisFlash'},
        'templateFrontendHeader': {to: 'frontendHeader'},
        'templateFrontendFooter': {to: 'frontendFooter'},
        'templateFrontendHeaderPhone': {to: 'frontendHeaderPhone'},
        'templateFrontendFooterPhone': {to: 'frontendFooterPhone'},
        'templateBackendHeader': {to: 'backendHeader'},
        'templateBackendFooter': {to: 'backendFooter'},
        'templateBackendHeaderPhone': {to: 'backendHeaderPhone'},
        'templateBackendFooterPhone': {to: 'backendFooterPhone'},
    },
    notFoundTemplate: 'templatePublicNotFound',
    loadingTemplate: 'templatePublicLoading',
});

/**
 * require login, if user logged in then call loading template else back to login page
 */
var requireLogin = function(pause) {
    if (!Meteor.user()) {
        if (Meteor.loggingIn())
            this.render('templatePublicLoading');
        else
            Router.go('frontend_usersLogin');
        pause();
    }
}

Router.onBeforeAction(requireLogin, {
    except: ['frontend_usersLogin', 'frontend_usersRegister']
});

/**
 * Mapping every router
 */
Router.map(function() {
    /* USERS */
    this.route('frontend_usersRegister', {
        path: 'frontend/users/register/',
        controller: Frontend.UsersController,
        yieldTemplates: {
            'meteorisFlash': {to: 'meteorisFlash'},
        },
    });
    this.route('frontend_usersLogin', {
        path: 'frontend/users/login/',
        controller: Frontend.UsersController,
        yieldTemplates: {
            'meteorisFlash': {to: 'meteorisFlash'},
        },
    });
    /* EOF USERS */

    /* DASHBOARDS */
    this.route('frontend_sitesIndex', {
        path: '/',
        controller: Frontend.SitesController,
    });
    /* EOF DASHBOARDS */

    /* POSTS */
    this.route('frontend_postsIndex', {
        path: 'frontend/posts/index/:limit?/:search?/',
        controller: Frontend.PostsController,
    });
    this.route('frontend_postsInsert', {
        path: 'frontend/posts/insert/',
        controller: Frontend.PostsController,
    });
    this.route('frontend_postsUpdate', {
        path: 'frontend/posts/update/:_id?',
        controller: Frontend.PostsController,
    });
    this.route('frontend_postsView', {
        path: 'frontend/posts/view/:_id?',
        controller: Frontend.PostsController,
    });
    /* EOF POSTS */

});