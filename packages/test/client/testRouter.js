/* Test */
Router.route('test', function() {
    Router.go('testIndex');
});
Router.route('test/index/:limit?/', {
    name: 'testIndex',
    controller: TestController,
    action: 'index',
});
Router.route('test/insert/', {
    name: 'testInsert',
    controller: TestController,
    action: 'insert',
});
Router.route('test/update/:_id?', {
    name: 'testUpdate',
    controller: TestController,
    action: 'update',
});
Router.route('test/view/:_id?', {
    name: 'testView',
    controller: TestController,
    action: 'view',
});
/* EOF Test */