Meteor.startup(function(){
  if (Meteor.isClient){

     var dialectBrowser = window.navigator.userLanguage || window.navigator.language;
     var langBrowser = getBaseLanguage(dialectBrowser);
     if (langBrowser === "en") {
       if (App.defaultLanguage) {
         return TAPi18n.setLanguage(App.defaultLanguage);
       }
     }

     var langs = TAPi18n.getLanguages();
     if (dialectBrowser in langs) return TAPi18n.setLanguage(dialectBrowser);
     if (langBrowser in langs) return TAPi18n.setLanguage(langBrowser);
     
     return TAPi18n.setLanguage("en-US");
  }
});

function getBaseLanguage(lang) {

  if (typeof(lang) === "undefined") return "";
  if (lang.length < 3) return lang;
  if (lang.indexOf('-') < 1) return lang;

  return lang.substring(0, lang.indexOf('-'));
}
