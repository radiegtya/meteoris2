Template.mugenRoleActionsUpdate.events = {
    'click #btnSave': function(e, t) {
        e.preventDefault();
        Router.current()._post = true;
        Router.current().update(t);        
        Router.current()._post = false;
    },
};