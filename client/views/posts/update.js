Template.postsUpdate.events = {
    'click #btnSave': function(e, t) {
        e.preventDefault();
        Router.current().update(t);        
    },
};