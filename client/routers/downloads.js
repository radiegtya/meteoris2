/* Downloads */
Router.route('downloads', function() {
    Router.go('downloadsIndex');
});
Router.route('downloads/index/:limit?/', {
    name: 'downloadsIndex',
    controller: DownloadsController,
    action: 'index',
});
Router.route('downloads/insert/', {
    name: 'downloadsInsert',
    controller: DownloadsController,
    action: 'insert',
});
Router.route('downloads/update/:_id?', {
    name: 'downloadsUpdate',
    controller: DownloadsController,
    action: 'update',
});
Router.route('downloads/view/:_id?', {
    name: 'downloadsView',
    controller: DownloadsController,
    action: 'view',
});
/* EOF Downloads */