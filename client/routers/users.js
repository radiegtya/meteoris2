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