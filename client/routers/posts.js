/* POSTS */
Router.route('posts/index/:limit?/', {
    name: 'postsIndex',
    controller: PostsController,
    action: 'index',
});
Router.route('posts/insert/', {
    name: 'postsInsert',
    controller: PostsController,
    action: 'insert',
});
Router.route('posts/update/:_id?', {
    name: 'postsUpdate',
    controller: PostsController,
    action: 'update',
});
Router.route('posts/view/:_id?', {
    name: 'postsView',
    controller: PostsController,
    action: 'view',
});
/* EOF POSTS */