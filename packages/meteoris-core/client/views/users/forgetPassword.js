Template.usersForgetPassword.events = {
    'click #btnForgetPassword': function(e, t){
        e.preventDefault();    
        Router.current()._post = true;
        Router.current().forgetPassword(t);
        Router.current()._post = false;
    },        
};