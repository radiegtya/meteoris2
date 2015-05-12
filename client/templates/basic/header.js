Template.templateBasicHeader.events({
    'click a.lang':function(e){
	lang='undefined';
	$this=$(e.target);
	lang=$this.data("lang");
	TAPi18n.setLanguage(lang);
    },
    'click #btnLogout': function() {
        Meteor.logout(function(){
            Router.go('usersLogin');
        });          
    }
});
