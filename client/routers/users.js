/* USERS */
Router.route('users/register/', {
    name: 'usersRegister',
    controller: UsersController,
});
Router.route('users/login/', {
    name: 'usersLogin',
    controller: UsersController,
});
Router.route('users', function(){
    Router.go('usersIndex');
});
Router.route('users/index/:limit?/', {
    name: 'usersIndex',
    controller: UsersController,
    action: 'index',
});
Router.route('users/insert/', {
    name: 'usersInsert',
    controller: UsersController,
    action: 'insert',
});
Router.route('users/update/:_id?', {
    name: 'usersUpdate',
    controller: UsersController,
    action: 'update',
});
Router.route('users/view/:_id?/', {
    name: 'usersView',
    controller: UsersController,
    action: 'view'
});
Router.route('users/profile/:_id?/', {
    name: 'usersProfile',
    controller: UsersController,
    action: 'profile'
});
Router.route('users/forgetPassword/', {
    name: 'usersForgetPassword',
    controller: UsersController,
    action: 'forgetPassword'
});
Router.route('users/resetPassword/:token?', {
    name: 'usersResetPassword',
    controller: UsersController,
    action: 'resetPassword'
});
/* EOF USERS */