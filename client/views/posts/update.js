Template.postsUpdate.events = {
    'click .btnSave': function(e, t) {
        e.preventDefault();
        Router.current().update(t);        
    },
    'click .btnCancel': function(e) {
        e.preventDefault();
        Router.go('postsIndex');
    },
};