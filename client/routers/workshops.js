/* Workshops */
Router.route('workshops', function() {
    Router.go('workshopsIndex');
});
Router.route('workshops/index/:limit?/', {
    name: 'workshopsIndex',
    controller: WorkshopsController,
    action: 'index',
});
Router.route('workshops/insert/', {
    name: 'workshopsInsert',
    controller: WorkshopsController,
    action: 'insert',
});
Router.route('workshops/update/:_id?', {
    name: 'workshopsUpdate',
    controller: WorkshopsController,
    action: 'update',
});
Router.route('workshops/view/:_id?', {
    name: 'workshopsView',
    controller: WorkshopsController,
    action: 'view',
});
/* EOF Workshops */