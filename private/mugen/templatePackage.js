Package.describe({
  name: '{nameSpace}:{collection}',
  version: '0.0.1',
  summary: 'A {Collection} management package by {nameSpace}.',
  git: '',
  documentation: 'README.md'
});



Package.onUse(function(api) {

  api.versionsFrom('1.1.0.2');

  api.use('iron:router');
  api.use('meteor-platform');
  api.use('aldeed:simple-schema');
  api.use('meteoris:meteoris-core');
  api.use('accounts-ui');
  api.use('tap:i18n', ["client", "server"]);

  api.add_files("package-tap.i18n", ["client", "server"]);


  api.addFiles([
        'lib/{Collection}.js'
      , 'lib/{Collection}Controller.js'
    ], ['client', 'server']
  );

  api.export('{Collection}', ['client', 'server']);
  api.export('{Collection}Controller', ['client', 'server']);

  api.addFiles('server/{Collection}Server.js', 'server');

  api.addFiles([
        'client/views/_form.html'
      , 'client/views/index.html'
      , 'client/views/insert.html'
      , 'client/views/update.html'
      , 'client/views/view.html'
    ], ['client']
  );

  api.addFiles([
        'client/{collection}Router.js'
      , 'client/views/_form.js'
      , 'client/views/index.js'
      , 'client/views/insert.js'
      , 'client/views/update.js'
      , 'client/views/view.js'
    ], ['client']
  );

  api.addFiles([
        'i18n/en.i18n.json'
      , 'i18n/es.i18n.json'
      , 'i18n/fr.i18n.json'
      , 'i18n/zh-CN.i18n.json'
    ], ['client', 'server']
  );

});

/*
packages/{collection}
├── client
│   ├── {collection}Router.js
│   └── views
│       ├── _form.html
│       ├── _form.js
│       ├── index.html
│       ├── index.js
│       ├── insert.html
│       ├── insert.js
│       ├── update.html
│       ├── update.js
│       ├── view.html
│       └── view.js
├── lib
│   ├── {Collection}Controller.js
│   └── {Collection}.js
├── package.js
└── server
    └── {Collection}Server.js
*/