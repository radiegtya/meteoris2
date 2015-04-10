/* Emp */
Router.route('emp', function() {
    Router.go('empIndex');
});
Router.route('emp/index/:limit?/', {
    name: 'empIndex',
    controller: EmpController,
    action: 'index',
});
Router.route('emp/insert/', {
    name: 'empInsert',
    controller: EmpController,
    action: 'insert',
});
Router.route('emp/update/:_id?', {
    name: 'empUpdate',
    controller: EmpController,
    action: 'update',
});
Router.route('emp/view/:_id?', {
    name: 'empView',
    controller: EmpController,
    action: 'view',
});
/* EOF Emp */