if (App.activateMugen) {
    /* MugenRoleGroups */
    Router.route('mugenRoleGroups', function() {
        Router.go('mugenRoleGroupsIndex');
    });
    Router.route('mugenRoleGroups/index/:limit?/', {
        name: 'mugenRoleGroupsIndex',
        controller: MugenRoleGroupsController,
        action: 'index',
    });
    Router.route('mugenRoleGroups/insert/', {
        name: 'mugenRoleGroupsInsert',
        controller: MugenRoleGroupsController,
        action: 'insert',
    });
    Router.route('mugenRoleGroups/update/:_id?', {
        name: 'mugenRoleGroupsUpdate',
        controller: MugenRoleGroupsController,
        action: 'update',
    });
    Router.route('mugenRoleGroups/view/:_id?', {
        name: 'mugenRoleGroupsView',
        controller: MugenRoleGroupsController,
        action: 'view',
    });
    /* EOF MugenRoleGroups */
}