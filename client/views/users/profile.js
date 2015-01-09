Template.usersProfile.events = {
    'click #btnChangeProfile': function(e, t){
        e.preventDefault();        
        Router.current().changeProfile(t);
    },
    'click #btnChangePassword': function(e, t){
        e.preventDefault();        
        Router.current().changePassword(t);
    }
};

Template.usersProfile.helpers({
});