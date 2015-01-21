/* Speakers */
Router.route('speakers', function() {
    Router.go('speakersIndex');
});
Router.route('speakers/index/:limit?/', {
    name: 'speakersIndex',
    controller: SpeakersController,
    action: 'index',
});
Router.route('speakers/insert/', {
    name: 'speakersInsert',
    controller: SpeakersController,
    action: 'insert',
});
Router.route('speakers/update/:_id?', {
    name: 'speakersUpdate',
    controller: SpeakersController,
    action: 'update',
});
Router.route('speakers/view/:_id?', {
    name: 'speakersView',
    controller: SpeakersController,
    action: 'view',
});
/* EOF Speakers */