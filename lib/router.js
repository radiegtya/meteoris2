/**
 * configuring router
 * set layoutTemplate to layout template (you can look layout template at client/views/index.html)
 * set every partial template / called yieldTemplates to choosen template (you can look templates at client/templates)
 * set loading template from templates folder too
 */
Router.configure({
    layoutTemplate: 'layout',
    yieldTemplates: {
        'meteorisFlash': {to: 'meteorisFlash'},
        'templateDefaultHeader': {to: 'header'},
        'templateDefaultMenu': {to: 'menu'},
        'templateDefaultFooter': {to: 'footer'},
        'templatePhoneHeader': {to: 'headerPhone'},
        'templatePhoneMenu': {to: 'menuPhone'},
        'templatePhoneFooter': {to: 'footerPhone'},
    },
    loadingTemplate: 'templateDefaultLoading',
});

/**
 * require login, if user logged in then call loading template else back to login page
 */
var requireLogin = function(pause) {
    if (!Meteor.user()) {
        if (Meteor.loggingIn())
            this.render('templateDefaultLoading')
        else
            Router.go('usersLogin');
        pause();
    }
}

Router.onBeforeAction(requireLogin, {
    except: ['usersLogin', 'usersRegister']
});

/**
 * Mapping every router
 */
Router.map(function() {
    /* USERS */
    this.route('usersRegister', {
        path: 'users/register/',
        controller: UsersController,
        yieldTemplates: {
            'meteorisFlash': {to: 'meteorisFlash'},
        },
    });
    this.route('usersLogin', {
        path: 'users/login/',
        controller: UsersController,
        yieldTemplates: {
            'meteorisFlash': {to: 'meteorisFlash'},
        },
    });
    /* EOF USERS */

    /* DASHBOARDS */
    this.route('sitesIndex', {
        path: '/',
    });
    /* EOF DASHBOARDS */

    /* POSTS */
    this.route('postsIndex', {
        path: 'posts/index/:limit?/:search?/',
        controller: PostsController,
    });
    this.route('postsInsert', {
        path: 'posts/insert/',
        controller: PostsController,
    });
    this.route('postsUpdate', {
        path: 'posts/update/:_id?',
        controller: PostsController,
    });
    this.route('postsView', {
        path: 'posts/view/:_id?',
        controller: PostsController,
    });
    /* EOF POSTS */

});