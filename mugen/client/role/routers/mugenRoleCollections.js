if (App.activateMugen) {
    /* MugenRoleCollections */
    Router.route('mugenRoleCollections', function() {
        Router.go('mugenRoleCollectionsIndex');
    });
    Router.route('mugenRoleCollections/index/:limit?/', {
        name: 'mugenRoleCollectionsIndex',
        controller: MugenRoleCollectionsController,
        action: 'index',
    });
    Router.route('mugenRoleCollections/insert/', {
        name: 'mugenRoleCollectionsInsert',
        controller: MugenRoleCollectionsController,
        action: 'insert',
    });
    Router.route('mugenRoleCollections/update/:_id?', {
        name: 'mugenRoleCollectionsUpdate',
        controller: MugenRoleCollectionsController,
        action: 'update',
    });
    Router.route('mugenRoleCollections/view/:_id?', {
        name: 'mugenRoleCollectionsView',
        controller: MugenRoleCollectionsController,
        action: 'view',
    });
    /* EOF MugenRoleCollections */
}
