Template.usersResetPassword.events = {
    'click #btnResetPassword': function(e, t){
        e.preventDefault();    
        Router.current()._post = true;
        Router.current().resetPassword(t);
        Router.current()._post = false;
    },        
};