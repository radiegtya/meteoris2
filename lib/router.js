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
    loadingTemplate: 'loading',
});

var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render('loading')
    else
      Router.go('usersLogin');
    pause();
  }
}

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {
    except: ['usersLogin', 'usersRegister']
});

Router.map(function() {
    /*============================== SITE MODULE ========================================*/

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

    /*============================== EOF SITE MODULE ========================================*/


    /*============================== EXAMPLE MODULE ========================================*/

    /* POSTS */
    this.route('postsIndex', {
        path: 'posts/index/:limit?/',
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

    /*============================== EOF EXAMPLE MODULE ========================================*/
});