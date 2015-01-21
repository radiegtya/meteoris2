/* Galleries */
Router.route('galleries', function() {
    Router.go('galleriesIndex');
});
Router.route('galleries/index/:limit?/', {
    name: 'galleriesIndex',
    controller: GalleriesController,
    action: 'index',
});
Router.route('galleries/insert/', {
    name: 'galleriesInsert',
    controller: GalleriesController,
    action: 'insert',
});
Router.route('galleries/update/:_id?', {
    name: 'galleriesUpdate',
    controller: GalleriesController,
    action: 'update',
});
Router.route('galleries/view/:_id?', {
    name: 'galleriesView',
    controller: GalleriesController,
    action: 'view',
});
/* EOF Galleries */