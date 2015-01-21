/* Categories */
Router.route('categories', function() {
    Router.go('categoriesIndex');
});
Router.route('categories/index/:limit?/', {
    name: 'categoriesIndex',
    controller: CategoriesController,
    action: 'index',
});
Router.route('categories/insert/', {
    name: 'categoriesInsert',
    controller: CategoriesController,
    action: 'insert',
});
Router.route('categories/update/:_id?', {
    name: 'categoriesUpdate',
    controller: CategoriesController,
    action: 'update',
});
Router.route('categories/view/:_id?', {
    name: 'categoriesView',
    controller: CategoriesController,
    action: 'view',
});
/* EOF Categories */