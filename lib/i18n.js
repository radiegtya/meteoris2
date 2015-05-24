languageI18nDependency = new Tracker.Dependency;

MeteorisI18n = {
  getBaseLanguage : function (lang) {

    languageI18nDependency.depend();

    if (typeof(lang) === "undefined") return "";
    if (lang.length < 3) return lang;
    if (lang.indexOf('-') < 1) return lang;

    return lang.substring(0, lang.indexOf('-'));
  },
  setSessionLanguage : function (lang) {
    TAPi18n.setLanguage(lang);
    moment.locale(lang);
    console.log("i18n,js set to :: " + lang);

    languageI18nDependency.changed();

  },
  currentLanguage : function() {
    var lang = TAPi18n.getLanguage();
    var langs = TAPi18n.getLanguages();
    var language = langs[lang].name;

    languageI18nDependency.depend();

    return language;
  },
  language : function() {
    var languages = [];
    var langs = TAPi18n.getLanguages();
    for (lang in langs) {
        languages.push({name:langs[lang].name, code:lang});
    }
    return languages;
  }
};

Meteor.startup(function(){
  if (Meteor.isClient){

     var dialectBrowser = window.navigator.userLanguage || window.navigator.language;
     var langBrowser = MeteorisI18n.getBaseLanguage(dialectBrowser);
     if (langBrowser === "en") {
       if (App.defaultLanguage) {
         MeteorisI18n.setSessionLanguage(App.defaultLanguage);
       }
     }

     var langs = TAPi18n.getLanguages();
     if (dialectBrowser in langs) return MeteorisI18n.setSessionLanguage(dialectBrowser);
     if (langBrowser in langs) return MeteorisI18n.setSessionLanguage(langBrowser);
     
     MeteorisI18n.setSessionLanguage("en-US");
  }
});


UI.registerHelper('meteorisI18nSetlang', function(value) {
    return MeteorisI18n.setSessionLanguage(value);
});
UI.registerHelper('meteorisI18nCurrentLanguage', function(value) {
    return MeteorisI18n.currentLanguage(value);
});
UI.registerHelper('meteorisI18nLanguages', function(value) {
    return MeteorisI18n.language(value);
});