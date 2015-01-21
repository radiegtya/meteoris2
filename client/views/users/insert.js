Template.usersInsert.events = {
    'click #btnSave': function(e, t) {
        e.preventDefault();
        Router.current()._post = true;
        Router.current().insert(t, true);   
        Router.current()._post = false;
    },
};