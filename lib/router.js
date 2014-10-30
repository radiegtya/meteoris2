/**
 * configuring router
 * set layoutTemplate to layout template (you can look layout template at client/views/index.html)
 * set every partial template / called yieldTemplates to choosen template (you can look templates at client/templates)
 * set loading template from templates folder too
 */
Router.configure({
    layoutTemplate: 'frontend', //set default layout to frontend
    yieldTemplates: {
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
var requireLogin = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn())
            this.render('templatePublicLoading');
        else
            Router.go('backendUsersLogin');
    } else {
        this.next();
    }
}

Router.onBeforeAction(requireLogin, {
    only: [
        'backendSitesIndex',
        'backendPostsIndex',
        'backendPostsInsert',
        'backendPostsUpdate',
        'backendPostsView',
    ]
});

/**
 * Mapping every router
 */
/*=========================================== FRONTEND ROUTING =================================================== */

/* DASHBOARDS */
Router.route('/', {
    name: 'frontendSitesIndex',
    controller: Frontend.SitesController,
});
/* EOF DASHBOARDS */

/* POSTS */
Router.route('frontend/posts/index/:limit?/:search?/', {
    name: 'frontendPostsIndex',
    controller: Frontend.PostsController,
});
Router.route('frontend/posts/insert/', {
    name: 'frontendPostsInsert',
    controller: Frontend.PostsController,
});
Router.route('frontend/posts/update/:_id?', {
    name: 'frontendPostsUpdate',
    controller: Frontend.PostsController,
});
Router.route('frontend/posts/view/:_id?', {
    name: 'frontendPostsView',
    controller: Frontend.PostsController,
});
/* EOF POSTS */

/*=========================================== EOF FRONTEND ROUTING =================================================== */

/*=========================================== BACKEND ROUTING =================================================== */
/* USERS */
Router.route('backend/users/register/', {
    name: 'backendUsersRegister',
    controller: Backend.UsersController,
    yieldTemplates: {},
});
Router.route('backend/users/login/', {
    name: 'backendUsersLogin',
    controller: Backend.UsersController,
    yieldTemplates: {},
});
/* EOF USERS */

/* DASHBOARDS */
Router.route('backend/sites/index/', {
    name: 'backendSitesIndex',
    controller: Backend.SitesController,
});
/* EOF DASHBOARDS */

/* POSTS */
Router.route('backend/posts/index/:limit?/:search?/', {
    name: 'backendPostsIndex',
    controller: Backend.PostsController,
});
Router.route('backend/posts/insert/', {
    name: 'backendPostsInsert',
    controller: Backend.PostsController,
});
Router.route('backend/posts/update/:_id?', {
    name: 'backendPostsUpdate',
    controller: Backend.PostsController,
});
Router.route('backend/posts/view/:_id?', {
    name: 'backendPostsView',
    controller: Backend.PostsController,
});
/* EOF POSTS */

/*=========================================== EOF BACKEND ROUTING =================================================== */
