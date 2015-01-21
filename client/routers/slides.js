/* Slides */
Router.route('slides', function() {
    Router.go('slidesIndex');
});
Router.route('slides/index/:limit?/', {
    name: 'slidesIndex',
    controller: SlidesController,
    action: 'index',
});
Router.route('slides/insert/', {
    name: 'slidesInsert',
    controller: SlidesController,
    action: 'insert',
});
Router.route('slides/update/:_id?', {
    name: 'slidesUpdate',
    controller: SlidesController,
    action: 'update',
});
Router.route('slides/view/:_id?', {
    name: 'slidesView',
    controller: SlidesController,
    action: 'view',
});
/* EOF Slides */