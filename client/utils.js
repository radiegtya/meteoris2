Template.registerHelper('currentLanguage', function() {
  var lang = TAPi18n.getLanguage();
  var langs = TAPi18n.getLanguages();
  var language = langs[lang].name;
  return language;
});

Template.registerHelper('language', function(){
  var languages = [];
  var langs = TAPi18n.getLanguages();
  for (lang in langs) {
      languages.push({name:langs[lang].name, code:lang});
  }
  return languages;
});
