Template.backendPostsInsert.events = {
    'click #btnSave': function(e, t) {
        e.preventDefault();
        Router.current().insert(t);        
    },
};