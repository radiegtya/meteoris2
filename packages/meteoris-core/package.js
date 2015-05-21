Package.describe({
  name: 'meteoris:meteoris-core',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'The run time parts of Meteoris.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});


var filesHtmlClient = [
    'client/flash/flash.html'
  , 'client/flash/flash.css'
];

var filesJsClient = [
    'client/flash/flash.js'
  , 'client/alert/alert.js'
];

var filesJsBoth = [
    'lib/controllers/MeteorisController.js'
];




Package.onUse(function(api) {
  // If no version is specified for an 'api.use' dependency, use the
  // one defined in Meteor 1.1.0.2.
  api.versionsFrom('1.1.0.2');

  api.use('iron:router');
  api.use('meteor-platform');
  api.use('meteorhacks:subs-manager');
  api.use('accounts-ui');
  api.use('kevohagan:sweetalert');
  api.use('liyu:sprintfjs');  

  api.addFiles(filesJsBoth, ['client', 'server']);
  api.export('MeteorisAlert', 'client');
  api.export('MeteorisFlash', 'client');
  api.export('MeteorisController', ['client', 'server']);

  api.addFiles(filesHtmlClient, 'client');  // MUST add all templates FIRST, so helpers can find them
  api.addFiles(filesJsClient, 'client');    // Now put list your helpers **in execution order**.

});

/*
Package.onTest(function(api) {
  api.use('tinytest');
  api.use('warehouseman:todos-pkg');
  api.addFiles('tests/todos-pkg-tests.js');
});
*/
