Template.mugenRoleGroupsInsert.events = {
//    'click #btnSave': function(e, t) {      //  Handling click, rather than submit, makes
    'submit #mugenRoleGroups_form': function(e, t) {    //  integration testing very difficult
        e.preventDefault();
        Router.current()._post = true;
        Router.current().insert(t, true);   
        Router.current()._post = false;
    },
};
