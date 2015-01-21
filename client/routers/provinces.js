/* Provinces */
Router.route('provinces', function() {
    Router.go('provincesIndex');
});
Router.route('provinces/index/:limit?/', {
    name: 'provincesIndex',
    controller: ProvincesController,
    action: 'index',
});
Router.route('provinces/insert/', {
    name: 'provincesInsert',
    controller: ProvincesController,
    action: 'insert',
});
Router.route('provinces/update/:_id?', {
    name: 'provincesUpdate',
    controller: ProvincesController,
    action: 'update',
});
Router.route('provinces/view/:_id?', {
    name: 'provincesView',
    controller: ProvincesController,
    action: 'view',
});
/* EOF Provinces */