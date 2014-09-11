Package.describe({
  summary: "Flash Message for meteor, best use for Piyiku-mvvm framework",
  version: "0.0.1",  
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.1.1');
  api.addFiles('flash.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('piyiku:flash');
  api.addFiles('flash-tests.js');
});
