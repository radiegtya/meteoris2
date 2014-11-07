Template.usersRegister.events = {
    'click #btnRegister': function(e, t){
        e.preventDefault();        
        Router.current().register(t);
    },    
};