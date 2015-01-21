/* Confirmations */
Router.route('confirmations', function() {
    Router.go('confirmationsIndex');
});
Router.route('confirmations/index/:limit?/', {
    name: 'confirmationsIndex',
    controller: ConfirmationsController,
    action: 'index',
});
Router.route('confirmations/insert/', {
    name: 'confirmationsInsert',
    controller: ConfirmationsController,
    action: 'insert',
});
Router.route('confirmations/update/:_id?', {
    name: 'confirmationsUpdate',
    controller: ConfirmationsController,
    action: 'update',
});
Router.route('confirmations/view/:_id?', {
    name: 'confirmationsView',
    controller: ConfirmationsController,
    action: 'view',
});
/* EOF Confirmations */