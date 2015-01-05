/* MugenRoleActions */
Router.route('mugenRoleActions', function() {
    Router.go('mugenRoleActionsIndex');
});
Router.route('mugenRoleActions/index/:limit?/', {
    name: 'mugenRoleActionsIndex',
    controller: MugenRoleActionsController,
    action: 'index',
});
Router.route('mugenRoleActions/insert/', {
    name: 'mugenRoleActionsInsert',
    controller: MugenRoleActionsController,
    action: 'insert',
});
Router.route('mugenRoleActions/update/:_id?', {
    name: 'mugenRoleActionsUpdate',
    controller: MugenRoleActionsController,
    action: 'update',
});
Router.route('mugenRoleActions/view/:_id?', {
    name: 'mugenRoleActionsView',
    controller: MugenRoleActionsController,
    action: 'view',
});
/* EOF MugenRoleActions */