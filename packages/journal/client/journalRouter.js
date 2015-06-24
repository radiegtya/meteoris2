/* Journal */
Router.route('journal', function() {
    Router.go('journalIndex');
});
Router.route('journal/index/:limit?/', {
    name: 'journalIndex',
    controller: JournalController,
    action: 'index',
});
Router.route('journal/insert/', {
    name: 'journalInsert',
    controller: JournalController,
    action: 'insert',
});
Router.route('journal/update/:_id?', {
    name: 'journalUpdate',
    controller: JournalController,
    action: 'update',
});
Router.route('journal/view/:_id?', {
    name: 'journalView',
    controller: JournalController,
    action: 'view',
});
/* EOF Journal */