/* Tasks */
Router.route('tasks', function() {
    Router.go('tasksIndex');
});
Router.route('tasks/index/:limit?/', {
    name: 'tasksIndex',
    controller: TasksController,
    action: 'index',
});
Router.route('tasks/insert/', {
    name: 'tasksInsert',
    controller: TasksController,
    action: 'insert',
});
Router.route('tasks/update/:_id?', {
    name: 'tasksUpdate',
    controller: TasksController,
    action: 'update',
});
Router.route('tasks/view/:_id?', {
    name: 'tasksView',
    controller: TasksController,
    action: 'view',
});
/* EOF Tasks */