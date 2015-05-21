Template.usersRegister.events = {
    'click #btnRegister': function(e, t){
        e.preventDefault();        
        Router.current().register(t);
    },    
};


Template.usersRegister.helpers({    
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
