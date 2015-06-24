/* Replacement */
Router.route('replacement', function() {
    Router.go('replacementIndex');
});
Router.route('replacement/index/:limit?/', {
    name: 'replacementIndex',
    controller: ReplacementController,
    action: 'index',
});
Router.route('replacement/insert/', {
    name: 'replacementInsert',
    controller: ReplacementController,
    action: 'insert',
});
Router.route('replacement/update/:_id?', {
    name: 'replacementUpdate',
    controller: ReplacementController,
    action: 'update',
});
Router.route('replacement/view/:_id?', {
    name: 'replacementView',
    controller: ReplacementController,
    action: 'view',
});
/* EOF Replacement */