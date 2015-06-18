(function () {

  Handlebars.registerHelper('index_i18n', function () {
    return "sitesIndex_" + TAPi18n.getLanguage();
  });

})();
