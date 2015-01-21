/* Positions */
Router.route('positions', function() {
    Router.go('positionsIndex');
});
Router.route('positions/index/:limit?/', {
    name: 'positionsIndex',
    controller: PositionsController,
    action: 'index',
});
Router.route('positions/insert/', {
    name: 'positionsInsert',
    controller: PositionsController,
    action: 'insert',
});
Router.route('positions/update/:_id?', {
    name: 'positionsUpdate',
    controller: PositionsController,
    action: 'update',
});
Router.route('positions/view/:_id?', {
    name: 'positionsView',
    controller: PositionsController,
    action: 'view',
});
/* EOF Positions */