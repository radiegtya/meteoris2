Package.describe({
  name: 'meteoris:mugen-utilities',
  version: '0.0.1',
  summary: 'Constants for module generator.',
  git: '',
  documentation: 'README.md'
});



Package.onUse(function(api) {

  api.versionsFrom('1.1.0.2');

  api.export('MugenUtils', ['client', 'server']);
  api.addFiles('utils.js', ['client', 'server']);
  api.addFiles('configuration.js', ['client', 'server']);

});
