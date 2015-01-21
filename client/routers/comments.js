/* Comments */
Router.route('comments', function() {
    Router.go('commentsIndex');
});
Router.route('comments/index/:limit?/', {
    name: 'commentsIndex',
    controller: CommentsController,
    action: 'index',
});
Router.route('comments/insert/', {
    name: 'commentsInsert',
    controller: CommentsController,
    action: 'insert',
});
Router.route('comments/update/:_id?', {
    name: 'commentsUpdate',
    controller: CommentsController,
    action: 'update',
});
Router.route('comments/view/:_id?', {
    name: 'commentsView',
    controller: CommentsController,
    action: 'view',
});
/* EOF Comments */