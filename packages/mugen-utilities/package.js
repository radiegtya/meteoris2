Package.describe({
  name: 'meteoris:mugen-utilities',
  version: '0.0.1',
  summary: 'Constants for module generator.',
  git: '',
  documentation: 'README.md'
});

var filesHtmlClient = [
    'client/_form.html'
  , 'client/insert.html'
  //views mugenRoleActions
  ,	'client/role/views/mugenRoleActions/_form.html'
  ,	'client/role/views/mugenRoleActions/index.html'
  ,	'client/role/views/mugenRoleActions/insert.html'
  ,	'client/role/views/mugenRoleActions/manage.html'
  ,	'client/role/views/mugenRoleActions/update.html'
  ,	'client/role/views/mugenRoleActions/view.html'
  //views mugenRoleCollections
  ,	'client/role/views/mugenRoleCollections/_form.html'
  ,	'client/role/views/mugenRoleCollections/index.html'
  ,	'client/role/views/mugenRoleCollections/insert.html'
  ,	'client/role/views/mugenRoleCollections/update.html'
  ,	'client/role/views/mugenRoleCollections/view.html'
  //views mugenRoleGroups
  ,	'client/role/views/mugenRoleGroups/_form.html'
  ,	'client/role/views/mugenRoleGroups/index.html'
  ,	'client/role/views/mugenRoleGroups/insert.html'
  ,	'client/role/views/mugenRoleGroups/update.html'
  ,	'client/role/views/mugenRoleGroups/view.html'
];

var filesJsClient = [
  //routers
    'client/role/routers/mugenRoleActions.js'
  , 'client/role/routers/mugenRoleCollections.js'
  , 'client/role/routers/mugenRoleGroups.js'
  , 'client/_form.js'
  ,	'client/insert.js'
  ,	'client/router.js'
  //views mugenRoleActions
  ,	'client/role/views/mugenRoleActions/_form.js'
  ,	'client/role/views/mugenRoleActions/index.js'
  ,	'client/role/views/mugenRoleActions/insert.js'
  ,	'client/role/views/mugenRoleActions/manage.js'
  ,	'client/role/views/mugenRoleActions/update.js'
  ,	'client/role/views/mugenRoleActions/view.js'
  //views mugenRoleCollections
  ,	'client/role/views/mugenRoleCollections/_form.js'
  ,	'client/role/views/mugenRoleCollections/index.js'
  ,	'client/role/views/mugenRoleCollections/insert.js'
  ,	'client/role/views/mugenRoleCollections/update.js'
  ,	'client/role/views/mugenRoleCollections/view.js'
  //views mugenRoleGroups
  ,	'client/role/views/mugenRoleGroups/_form.js'
  ,	'client/role/views/mugenRoleGroups/index.js'
  ,	'client/role/views/mugenRoleGroups/insert.js'
  ,	'client/role/views/mugenRoleGroups/update.js'
  ,	'client/role/views/mugenRoleGroups/view.js'
];

var filesJsBoth = [
  //controllers
  	'lib/controllers/MeteorisController.js'
  , 'lib/controllers/MugenRoleActionsController.js'
  , 'lib/controllers/MugenRoleCollectionsController.js'
  , 'lib/controllers/MugenRoleGroupsController.js'
  //collections
  , 'lib/collections/MugenRoleActions.js'
  , 'lib/collections/MugenRoleCollections.js'
  , 'lib/collections/MugenRoleGroups.js'
];

var filesJsonBoth = [
  //i18n
    'lib/i18n/en.i18n.json'
  , 'lib/i18n/es.i18n.json'
  , 'lib/i18n/fr.i18n.json'
];

var filesJsServer = [
    'server/MugenServer.js'
  , 'server/role/MugenRoleActionsServer.js'
  , 'server/role/MugenRoleCollectionsServer.js'
  , 'server/role/MugenRoleGroupsServer.js'
];

Package.onUse(function(api) {

  api.versionsFrom('1.1.0.2');

  api.use('iron:router@1.0.9');
  api.use('meteor-platform');
  api.use('aldeed:simple-schema@1.3.3');
  api.use('ground:db@0.3.9');
  api.use('momentjs:moment@2.10.3');
  api.use('cfs:standard-packages@0.5.9');
  api.use('service-configuration');
  api.use('meteorhacks:subs-manager@1.4.0');
  api.use('accounts-ui');
  api.use('kevohagan:sweetalert@0.5.0');
  api.use('liyu:sprintfjs@1.0.0');
  api.use('meteoris:meteoris-core');
  api.use('tap:i18n');
  
  api.export('App', ['client', 'server']);
  api.export('MugenUtils', ['client', 'server']);
  api.addFiles('utils.js', ['client', 'server']);
  api.addFiles('configuration.js', ['client', 'server']);

  //export collection & controller to package
  var controllers = [
  	'MeteorisController',
  	'MugenRoleActionsController',
  	'MugenRoleCollectionsController',
  	'MugenRoleGroupsController'
  ];

  api.export(controllers, ['client', 'server']);

  var collections = [
  	'MugenRoleActions',
  	'MugenRoleCollections',
  	'MugenRoleGroups'
  ];

  api.export(collections, ['client', 'server']);

  //add all files template to package
  api.addFiles(filesHtmlClient, 'client');
  //add all file js client to package
  api.addFiles(filesJsClient, 'client');
  //add all collection & controller file to package
  api.addFiles(filesJsBoth, ['client', 'server']);
  //add all file json
  api.addFiles(filesJsonBoth, ['client', 'server']);
  //add all server file
  api.addFiles(filesJsServer, 'server');
});
