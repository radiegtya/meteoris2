Template.templateBasicHeader.events({
    'click #btnLogout': function() {
        Meteor.logout(function(){
            Router.go('usersLogin');
        });          
    }
});
