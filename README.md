METEORIS v0.9.8 (Meteor v1.0.3.1) <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RSYJP7FJJ4V6Y" target="_blank"><img src="https://camo.githubusercontent.com/e14c85b542e06215f7e56c0763333ef1e9b9f9b7/68747470733a2f2f7777772e70617970616c6f626a656374732e636f6d2f656e5f55532f692f62746e2f62746e5f646f6e6174655f534d2e676966" alt="Donate" data-canonical-src="https://www.paypalobjects.com/id_ID/i/scr/pixel.gif" style="max-width:100%;"></a>
===============



**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [WHAT IS METEORIS?](https://github.com/radiegtya/meteoris#what-is-meteoris)
- [WHY USE METEORIS?](https://github.com/radiegtya/meteoris#why-use-meteoris)
- [WHAT'S NEW IN V0.9.8](https://github.com/radiegtya/meteoris#whats-new-in-v098)
- [WHAT'S INSIDE METEORIS?](https://github.com/radiegtya/meteoris#whats-inside-meteoris)
- [DOCUMENTATION](https://github.com/radiegtya/meteoris#documentation)
- [METEORIS ROADMAP AND CHANGELOG](https://github.com/radiegtya/meteoris#meteoris-roadmap-and-changelog)
- [WHAT'S NEW IN](https://github.com/radiegtya/meteoris#whats-new-in-v096)
- [Contributing](https://github.com/radiegtya/meteoris#contributing)







###WHAT IS METEORIS?
Meteoris is a Realtime Javascript Boilerplate based on Meteor Js framework v1.0. 
It helps you structure your Meteor Js apps and includes many useful packages.

###WHY USE METEORIS?
- Generate your apps on the fly using Meteoris UI Generator <MUGEN>. No more command prompt to generate basic crudss code!
- Looking for MVC/MVVM/MVP boilerplate for meteor v.0.9.x+?
- Tired of installing required packages/plugin and searching for the best packages?
- Want a standard way to structure all of your Meteor projects so they're consistent every time?
- Confused or don't have the time to learn about whats new in the latest meteor version? 

**METEORIS IS THE SOLUTION!**

###WHAT'S NEW IN V0.9.8
- minor bug fixing on mugen RBAC
- dropdown form for relational db

###WHAT'S INSIDE METEORIS?

Meteoris uses standard, useful, robust, and stable packages like Iron Router and Collection2. 

For a quick overview of what's inside Meteoris, go see our simple demo at the [demo page](http://meteoris.me) and **watch the video!**.

**Here is a list of the packages Meteoris uses: (not updated for Meteor 1.0.2)**

Package                                   | Version | Description
------------------------------------------|-----|-----------------------------
- accounts-base                           |1.1.2| A user account system
- accounts-facebook                       |1.0.2| Login service for Facebook ac...
- accounts-google                         |1.0.2| Login service for Google acco...
- accounts-password                       |1.0.4| Password support for accounts
- aldeed:collection2                      |2.2.0| Automatic validation of inser...
- cfs:ejson-file                          |0.0.0| CollectionFS, FS.File as EJSO...
- cfs:filesystem                          |0.0.0| Filesystem storage adapter fo...
- cfs:gridfs                              |0.0.0| GridFS storage adapter for Co...
- cfs:standard-packages                   |0.0.2| Filesystem for Meteor, collec...
- cordova:com.phonegap.plugins.PushPlugin |     | https://github.com/phonegap-build/PushPlugin
- dburles:collection-helpers              |1.0.1| Transform collections with helpers
- francocatena:status                     |1.0.2| Display the connection status...
- ground:db                               |0.0.9| Ground Meteor.Collections off...
- iron:router                             |1.0.0| Routing specifically designed...
- jquery                                  |1.0.1| Manipulate the DOM using CSS ...
- lepozepo:accounting                     |1.0.0| Accounting.js -  number, mone...
- meteor-platform                         |1.2.0| Include a standard set of Met...
- meteorhacks:subs-manager                |1.2.0| Subscriptions Manager for Meteor
- mizzao:timesync                         |0.2.2| NTP-style time synchronizatio...
- momentjs:moment                         |2.8.4| Moment.js, official package
- mystor:device-detection                 |0.2.0| Client-Side Device Type Detec...
- fortawesome:fontawesome                 |4.2.0| Font Awesome, official package
- twbs:bootstrap                          |3.3.1| Bootstrap, official package
- reywood:publish-composite               |1.3.2| Publish a set of related docu...
- sacha:spin                              |2.0.4| Simple spinner package for Me...
- service-configuration                   |1.0.2| Manage the configuration for ...



**NOTE: autopublish and insecure package are removed for security reasons.**

------------------------

###DOCUMENTATION
For now You can watch the documentation via youtube here:
[![IMAGE ALT TEXT HERE](http://content.screencast.com/users/Radiegtya/folders/Jing/media/cf1d9765-375c-47de-88e5-80e0af89b24d/meteoris%20vid.png)](http://www.youtube.com/watch?v=9AVKFwepaHM&list=PLkq0XDlLyPbA6y51gLeJSnK419PFFgS5M)

or you can view the doc via google docs here:

https://docs.google.com/document/d/1wEe2u9qLXRLEnWhnUx7wVyo7Jc66Dt2gkokXcP0iPCE/edit?usp=sharing

Ofc We're improving the documentation. Sneak preview available [here](https://github.com/warehouseman/meteoris/wiki/User-Manual).


###METEORIS ROADMAP AND CHANGELOG
You can view our roadmap from this link. 
 https://trello.com/b/01SvtPLA/meteoris-roadmap.
if you want to share your idea, just write it in our trello page from that link.

###WHAT'S NEW IN V0.9.7
- Roles addition #20 (RBAC) for meteoris Thanks to @MercedesAMG1
- Adding change profile n change password
- Add two default user admin and demo 
- some code refractoring for mugen

###WHAT'S NEW IN V0.9.6
- bug fixing for issue "too small max length for field name #26". Thanks to @anderson916.
- mugen enhancement for issue "camel hump collection name support #27". Thanks to @anderson916.
- mugen now enabling user to choose what they will generate. this also answer for issue about 'boilerplates in general #21'. Thanks to @MercedesAMG1 & @ssteinerx.

###WHAT'S NEW IN V0.9.5
- Regex checker in mugen for collection and field name (thanks to @ssteinerx for the suggestion)
- Updated to Meteor v1.0.1
- Fixing ground:db bug for the latest version of ground:db (thanks to @Peter Gerwing for the suggestion)
- Adding date type in mugen
- Fixing routing generated by mugen, now You can use localhost:3000/controllerName rather than localhost:3000/controllerName/index, although
localhost:3000/controllerName/index still works (thanks to @ssteinerx for the suggestion)
- Updating Readme for installation about git cloning simpler step and Mugen installation (Thanks to @tomcam for the suggestion)

###WHAT'S NEW IN V0.9.4
- Minor bug fixes in mugen (meteoris ui generator)
- Updated to Meteor v1.0.1
- Updated packages to latest versions

###WHAT'S NEW IN V0.9.3
- search is now using iron router query param, rather than default param (ex: ?q=yourSearch)
- collection helpers for relation n+1 etc
- now meteoris using MIT license rather than GNU

###WHAT'S NEW IN V0.9.2
- CODE GENERATOR WITH GUI :D
- Brand new code structure. Now it's more like the famous Rails/Yii Php Framework/Laravel structure. 
  It almost like MVC structure. So every coder in the world should try meteor :)

###WHAT'S NEW IN V0.9.1
- updating meteor to v1.0
- new iron router v1.0 support 
- new observer in server (auto remove relation)
- new relation global template so you can now call relation without having to query. Just like simple ORM
(ex: Showing related images collection (image url) from posts collection -> {{#each posts}}{{image.url}}{{/each}}
- renaming template which is using underscore(_) to lower/uppercase due to new iron router compatibility. 
(ex: frontend_postsIndex to frontendPostsIndex)
- adding push notification mobile example (this is still on alpha stage, please refer to example first)

###WHAT'S NEW IN V0.7.5
- updating meteor to v0.9.4
- adding mobile config to let you easily deploy apps

###WHAT'S NEW IN V0.7.1
- adding AppId field in every collection, so you can have many application using same database
- Server now only Publish list of collection according to appId to specify the data.
- now config are placed at lib, so both client and server can see it.
- updating ground:db to version 0.0.9
- adding video tutorial about basic usage of meteoris

###WHAT'S NEW IN V0.6.4
- updating core to meteor v0.9.3.1
- adding mrt:iron-router-progress
- adding loading when load more data in pagination
- updating iron-router to v0.9.4

###WHAT'S NEW IN V0.6.3
- updating core to meteor v0.9.3

###WHAT'S NEW IN V0.6.2
- adding groundDB v0.0.6 support to make collection able to work offline (thanks to Raix).
- adding reactive elapsed time functionality (ex: posted 5m ago like in facebook) in meteoris formatter package. 
  You can just type {{meteorisFormatter "elapsedTime" yourDate}} in blaze template view.
- updating aldeed:collection2 package to v.2.1.0.
- now you can access meteoris demo from http://meteoris.me

###WHAT'S NEW IN V0.6.1
- adding facebook login example
- code refractoring for unused code
- if there is no image to be shown, show noimage.jpg rather than blank in frontend/postsIndex

###WHAT'S NEW IN V0.5.6
- adding example to switching between template
- adding example about how to separate backend and frontend page
- now user is not required to be logged in to a view posts in frontend page

###WHAT'S NEW IN V0.5.2
- Now frontend and backend logic is separated
- Now frontend and backend templates are separated

### Contributing

Anyone is welcome to contribute. Fork, make your changes, and then submit a pull request.

You can also support us, to make meteoris improved and grow bigger.

