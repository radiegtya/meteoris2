/* WorkshopsCategories */
Router.route('workshopsCategories', function() {
    Router.go('workshopsCategoriesIndex');
});
Router.route('workshopsCategories/index/:limit?/', {
    name: 'workshopsCategoriesIndex',
    controller: WorkshopsCategoriesController,
    action: 'index',
});
Router.route('workshopsCategories/insert/', {
    name: 'workshopsCategoriesInsert',
    controller: WorkshopsCategoriesController,
    action: 'insert',
});
Router.route('workshopsCategories/update/:_id?', {
    name: 'workshopsCategoriesUpdate',
    controller: WorkshopsCategoriesController,
    action: 'update',
});
Router.route('workshopsCategories/view/:_id?', {
    name: 'workshopsCategoriesView',
    controller: WorkshopsCategoriesController,
    action: 'view',
});
/* EOF WorkshopsCategories */