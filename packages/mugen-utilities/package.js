Package.describe({
  name: 'meteoris:mugen-utilities',
  version: '0.0.1',
  summary: 'Constants for module generator.',
  git: '',
  documentation: 'README.md'
});

var filesHtmlClient = [
    'mugen/client/_form.html'
  , 'mugen/client/insert.html'
  //views mugenRoleActions
  ,	'mugen/client/role/views/mugenRoleActions/_form.html'
  ,	'mugen/client/role/views/mugenRoleActions/index.html'
  ,	'mugen/client/role/views/mugenRoleActions/insert.html'
  ,	'mugen/client/role/views/mugenRoleActions/manage.html'
  ,	'mugen/client/role/views/mugenRoleActions/update.html'
  ,	'mugen/client/role/views/mugenRoleActions/view.html'
  //views mugenRoleCollections
  ,	'mugen/client/role/views/mugenRoleCollections/_form.html'
  ,	'mugen/client/role/views/mugenRoleCollections/index.html'
  ,	'mugen/client/role/views/mugenRoleCollections/insert.html'
  ,	'mugen/client/role/views/mugenRoleCollections/update.html'
  ,	'mugen/client/role/views/mugenRoleCollections/view.html'
  //views mugenRoleGroups
  ,	'mugen/client/role/views/mugenRoleGroups/_form.html'
  ,	'mugen/client/role/views/mugenRoleGroups/index.html'
  ,	'mugen/client/role/views/mugenRoleGroups/insert.html'
  ,	'mugen/client/role/views/mugenRoleGroups/update.html'
  ,	'mugen/client/role/views/mugenRoleGroups/view.html'
];

var filesJsClient = [
  //routers
    'mugen/client/role/routers/mugenRoleActions.js'
  , 'mugen/client/role/routers/mugenRoleCollections.js'
  , 'mugen/client/role/routers/mugenRoleGroups.js'
  , 'mugen/client/_form.js'
  ,	'mugen/client/insert.js'
  ,	'mugen/client/router.js'
  //views mugenRoleActions
  ,	'mugen/client/role/views/mugenRoleActions/_form.js'
  ,	'mugen/client/role/views/mugenRoleActions/index.js'
  ,	'mugen/client/role/views/mugenRoleActions/insert.js'
  ,	'mugen/client/role/views/mugenRoleActions/manage.js'
  ,	'mugen/client/role/views/mugenRoleActions/update.js'
  ,	'mugen/client/role/views/mugenRoleActions/view.js'
  //views mugenRoleCollections
  ,	'mugen/client/role/views/mugenRoleCollections/_form.js'
  ,	'mugen/client/role/views/mugenRoleCollections/index.js'
  ,	'mugen/client/role/views/mugenRoleCollections/insert.js'
  ,	'mugen/client/role/views/mugenRoleCollections/update.js'
  ,	'mugen/client/role/views/mugenRoleCollections/view.js'
  //views mugenRoleGroups
  ,	'mugen/client/role/views/mugenRoleGroups/_form.js'
  ,	'mugen/client/role/views/mugenRoleGroups/index.js'
  ,	'mugen/client/role/views/mugenRoleGroups/insert.js'
  ,	'mugen/client/role/views/mugenRoleGroups/update.js'
  ,	'mugen/client/role/views/mugenRoleGroups/view.js'
];

var filesJsBoth = [
  //controllers
    'mugen/lib/controllers/MugenRoleActionsController.js'
  , 'mugen/lib/controllers/MugenRoleCollectionsController.js'
  , 'mugen/lib/controllers/MugenRoleGroupsController.js'
  //collections
  , 'mugen/lib/collections/MugenRoleActions.js'
  , 'mugen/lib/collections/MugenRoleCollections.js'
  , 'mugen/lib/collections/MugenRoleGroups.js'
];

var filesJsonBoth = [
  //i18n
    'mugen/lib/i18n/en.i18n.json'
  , 'mugen/lib/i18n/es.i18n.json'
  , 'mugen/lib/i18n/fr.i18n.json'
];

var filesJsServer = [
    'mugen/server/MugenServer.js'
  , 'mugen/server/role/MugenRoleActionsServer.js'
  , 'mugen/server/role/MugenRoleCollectionsServer.js'
  , 'mugen/server/role/MugenRoleGroupsServer.js'
];

var filesPrivate = [
    'private/mugen/views/_form.html'
  , 'private/mugen/views/index.html'
  , 'private/mugen/views/insert.html'
  , 'private/mugen/views/update.html'
  , 'private/mugen/views/view.html'
  , 'private/mugen/views/_form.js'
  , 'private/mugen/views/index.js'
  , 'private/mugen/views/insert.js'
  , 'private/mugen/views/update.js'
  , 'private/mugen/views/view.js'
  , 'private/mugen/collections/TemplateCollection.js'
  , 'private/mugen/controllers/TemplateController.js'
  , 'private/mugen/i18n/en.i18n.json'
  , 'private/mugen/i18n/es.i18n.json',
  , 'private/mugen/i18n/fr.i18n.json'
  , 'private/mugen/i18n/zh-CN.i18n.json'
  , 'private/mugen/routers/templateRouter.js'
  , 'private/mugen/server/TemplateServer.js'
  , 'private/mugen/templatePackage-tap.i18n'
  , 'private/mugen/templatePackage.js'
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
  api.use('tap:i18n');
  
  api.use('meteoris:meteoris-core');

  api.export('MugenUtils', ['client', 'server']);
  api.addFiles('utils.js', ['client', 'server']);
  api.addFiles('configuration.js', ['client', 'server']);

  //export collection & controller to package
  var controllers = [
  	'MugenRoleActionsController',
  	'MugenRoleCollectionsController',
  	'MugenRoleGroupsController',
    //private 
    'ReplacementController',
  ];

  api.export(controllers, ['client', 'server']);

  var collections = [
  	'MugenRoleActions',
  	'MugenRoleCollections',
  	'MugenRoleGroups',
    //private
    'Replacement'
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
  //add all private file
  api.addFiles(filesPrivate, 'server', {isAsset: true});
});
