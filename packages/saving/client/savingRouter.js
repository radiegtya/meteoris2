/* Saving */
Router.route('saving', function() {
    Router.go('savingIndex');
});
Router.route('saving/index/:limit?/', {
    name: 'savingIndex',
    controller: SavingController,
    action: 'index',
});
Router.route('saving/insert/', {
    name: 'savingInsert',
    controller: SavingController,
    action: 'insert',
});
Router.route('saving/update/:_id?', {
    name: 'savingUpdate',
    controller: SavingController,
    action: 'update',
});
Router.route('saving/view/:_id?', {
    name: 'savingView',
    controller: SavingController,
    action: 'view',
});
/* EOF Saving */