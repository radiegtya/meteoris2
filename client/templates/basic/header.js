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

/*
Template.templateBasicHeader.helpers({    
    currentLanguage: function() {

        var lang = TAPi18n.getLanguage();
        var langs = TAPi18n.getLanguages();
        var language = langs[lang].name;

        return language;
    },
    language: function() {
        var languages = [];
        var langs = TAPi18n.getLanguages();
        for (lang in langs) {
            languages.push({name:langs[lang].name, code:lang});
        }

        return languages;
    }
});
*/