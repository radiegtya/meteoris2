Template.usersLogin.events = {
    'click #btnLogin': function(e, t){
        e.preventDefault();        
        Router.current().login(t);
    },    
    'click #btnLoginFacebook': function(e, t){
        e.preventDefault();        
        Router.current().loginWithFacebook(t);
    },    
};