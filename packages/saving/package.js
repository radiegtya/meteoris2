Package.describe({
  name: 'piyiku:saving',
  version: '0.0.1',
  summary: 'A Saving management package by piyiku.',
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
        'lib/Saving.js'
      , 'lib/SavingController.js'
    ], ['client', 'server']
  );

  api.export('Saving', ['client', 'server']);
  api.export('SavingController', ['client', 'server']);

  api.addFiles('server/SavingServer.js', 'server');

  api.addFiles([
        'client/views/_form.html'
      , 'client/views/index.html'
      , 'client/views/insert.html'
      , 'client/views/update.html'
      , 'client/views/view.html'
    ], ['client']
  );

  api.addFiles([
        'client/savingRouter.js'
      , 'client/views/_form.js'
      , 'client/views/index.js'
      , 'client/views/insert.js'
      , 'client/views/update.js'
      , 'client/views/view.js'
    ], ['client']
  );

  api.addFiles([
        'i18n/en.i18n.json'
      // , 'i18n/es.i18n.json'
      // , 'i18n/fr.i18n.json'
      // , 'i18n/zh-CN.i18n.json'
    ], ['client', 'server']
  );

});

/*
packages/saving
├── client
│   ├── savingRouter.js
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
│   ├── SavingController.js
│   └── Saving.js
├── package.js
└── server
    └── SavingServer.js
*/