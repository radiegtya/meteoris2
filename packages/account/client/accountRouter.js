/* Account */
Router.route('account', function() {
    Router.go('accountIndex');
});
Router.route('account/index/:limit?/', {
    name: 'accountIndex',
    controller: AccountController,
    action: 'index',
});
Router.route('account/insert/', {
    name: 'accountInsert',
    controller: AccountController,
    action: 'insert',
});
Router.route('account/update/:_id?', {
    name: 'accountUpdate',
    controller: AccountController,
    action: 'update',
});
Router.route('account/view/:_id?', {
    name: 'accountView',
    controller: AccountController,
    action: 'view',
});
/* EOF Account */