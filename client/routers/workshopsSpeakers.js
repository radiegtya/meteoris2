/* WorkshopsSpeakers */
Router.route('workshopsSpeakers', function() {
    Router.go('workshopsSpeakersIndex');
});
Router.route('workshopsSpeakers/index/:limit?/', {
    name: 'workshopsSpeakersIndex',
    controller: WorkshopsSpeakersController,
    action: 'index',
});
Router.route('workshopsSpeakers/insert/', {
    name: 'workshopsSpeakersInsert',
    controller: WorkshopsSpeakersController,
    action: 'insert',
});
Router.route('workshopsSpeakers/update/:_id?', {
    name: 'workshopsSpeakersUpdate',
    controller: WorkshopsSpeakersController,
    action: 'update',
});
Router.route('workshopsSpeakers/view/:_id?', {
    name: 'workshopsSpeakersView',
    controller: WorkshopsSpeakersController,
    action: 'view',
});
/* EOF WorkshopsSpeakers */