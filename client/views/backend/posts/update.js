Template.backendPostsUpdate.events = {
    'click #btnSave': function(e, t) {
        e.preventDefault();
        Router.current().update(t);        
    },
};