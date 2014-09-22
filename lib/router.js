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
            Router.go('backend_usersLogin');
        pause();
    }
}

Router.onBeforeAction(requireLogin, {
    except: ['backend_usersLogin', 'backend_usersRegister']
});

/**
 * Mapping every router
 */
Router.map(function() {
    /*=========================================== BACKEND ROUTING =================================================== */
    
    /* USERS */
    this.route('backend_usersRegister', {
        path: 'backend/users/register/',
        controller: Backend.UsersController,
        yieldTemplates: {
            'meteorisFlash': {to: 'meteorisFlash'},
        },
    });
    this.route('backend_usersLogin', {
        path: 'backend/users/login/',
        controller: Backend.UsersController,
        yieldTemplates: {
            'meteorisFlash': {to: 'meteorisFlash'},
        },
    });
    /* EOF USERS */

    /* DASHBOARDS */
    this.route('backend_sitesIndex', {
        path: '/',
        controller: Backend.SitesController,
    });
    /* EOF DASHBOARDS */

    /* POSTS */
    this.route('backend_postsIndex', {
        path: 'backend/posts/index/:limit?/:search?/',
        controller: Backend.PostsController,
    });
    this.route('backend_postsInsert', {
        path: 'backend/posts/insert/',
        controller: Backend.PostsController,
    });
    this.route('backend_postsUpdate', {
        path: 'backend/posts/update/:_id?',
        controller: Backend.PostsController,
    });
    this.route('backend_postsView', {
        path: 'backend/posts/view/:_id?',
        controller: Backend.PostsController,
    });
    /* EOF POSTS */
    
    /*=========================================== EOF BACKEND ROUTING =================================================== */

});