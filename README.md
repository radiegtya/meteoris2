METEORIS v0.9.3 <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RSYJP7FJJ4V6Y" target="_blank"><img src="https://camo.githubusercontent.com/e14c85b542e06215f7e56c0763333ef1e9b9f9b7/68747470733a2f2f7777772e70617970616c6f626a656374732e636f6d2f656e5f55532f692f62746e2f62746e5f646f6e6174655f534d2e676966" alt="Donate" data-canonical-src="https://www.paypalobjects.com/id_ID/i/scr/pixel.gif" style="max-width:100%;"></a>
===============

###WHAT IS METEORIS?
Meteoris is a Realtime Javascript Boilerplate base on Meteor Js framework v1.0. 
It's help you structuring your Meteor Js apps, and there are many usefull packages inside.

###WHY USING METEORIS?
- Looking for MVC/MVVM/MVP boilerplate for meteor v.0.9.x?
- Tired of installing required packages/plugin, searching for best packages?
- Don't know how to structure your meteor apps or are too lazy to restructure again and again every time you create a new project?
- Trying to find the best structure for your meteor app?
- Confused or don't have the time to learn about whats new in the latest meteor version? 
**METEORIS IS THE SOLUTION :)**

###WHAT'S NEW IN V0.9.3
- search is now using iron router query param, rather than default param (ex: ?q=yourSearch)
- collection helpers for relation n+1 etc
- now meteoris using MIT license rather than GNU

###WHAT'S INSIDE METEORIS?
Meteoris uses standard, usefull, robust and stable packages like Iron Router and Collection2. Want to quickly understand what's inside Meteoris? 
Here is the simple demo about how Meteoris works http://meteoris.me

**Here is a list of packages which Meteoris uses:**

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



**note: autopublish and insecure package are removed due to security reason.**

------------------------

###DOCUMENTATIONS

**A. Installation**
 
 Before using this, make sure you have installing meteor with version
 greater than or equal to 0.9.1. To install meteor, run this command "curl
 https://install.meteor.com | /bin/sh". After that, follow this
 instruction:
 
 1. Git clone or download this repo. "git clone https://github.com/radiegtya/meteoris.git"
 2. Rename directory to your desired name "ex: meteoris to myproject"
 3. Change dir to your apps then just run "sudo meteor". Then type "localhost:3000" in your browser.
 4. There will be a running DEMO to get you started easily. Register your account from registration page, then  loging in using those
 account. You can then use the demo CRUDSS app.

**B. Folder Structure**
```
client/ 				# Client folder
    assets/             # Packages with global variable
    configs/            # Configuration files on the client
    css/                # Css files
    templates/          # Custom your template here
    views/              # Your views files 
        backend/        # Backend view pages
        frontend/       # Frontend view pages
lib/ 					# Executed both from client/server
    applications/       # framework base classes
    collections/        # Your collection files
    controllers/        # Your controllers files
        backend/        # Backend Controllers logical
        frontend/       # Frontend Controllers logical
    router.js           # Your routing location
public/ 			    # Your images or file
server/ 			    # Server folder
```

**C. Routing, Controller and Views**

*1. What is a Controller*

Controllers are class which are responsible for displaying dynamic data in the view.

*2. Creating a Controller (Backend)*

Let's create a simple controller named PostsController that extends MeteorisController.
```
PostsController = MeteorisController.extend({

});
```
> save this file in "lib/controllers/PostsController.js"

*3. Create function inside Controller (Backend)*
```
Backend.PostsController = MeteorisController.extend({
	getOtherMessage: function(){
            return "my Name is Ega Wachid Radiegtya";
	},
	/* passing data from controllers to view */
    data: function() {
	    var otherMessage = this.getOtherMessage();
        return {
			helloWorld: "Hello World",        
			otherMessage: otherMessage,
        };
    },
});
```
> save this file in "lib/controllers/backend/PostsController.js"

function data is responsible  for storing dynamic data to be displayed in the view. Create a view with related name, remember this is a best practice naming convention in Meteoris.

*4. Create html page to be used with Controller*
```
<template name="backendPostsIndex">
	<p>{{helloWorld}}</p>
	<p>{{otherMessage}}</p>
</template>
```
> save this file in "client/views/backend/posts/index.html"

*5. Setup your router* 
Router is responsible for url formatting, for example if you want to redirect user to "AppName/posts/index". You can make routing like this. 

> Best practice note: 
> - AppName is your apps name
> - posts is your controller name or your folder in views name
> -  index is your view name inside folder posts
> This is a little different from MVC concept that other frameworks use, where index is 
>  function name from the controller. It's Because we are using MVVM concept.

```
    /* POSTS */
    this.route('backendPostsIndex', { //targetted template
        path: 'backend/posts/index/', //desired path
        controller: Backend.PostsController, //targetted controller
    });
``` 

> save this file in "lib/router.js"

*6. running your app*
To run your app, use this url http://localhost:3000/posts/index.
Now you should see "Hello World" and "my Name is Ega Wachid Radiegtya" message on your screen. Congratulation!

> For complete tutorial about routing, controller and view you can visit this page https://github.com/EventedMind/iron-router from EventedMind.

**D. Collections**
> Documentation are Coming Soon! For now you can try the code at Posts DEMO.

**E. Publish Subscribe**
> Documentation are Coming Soon! For now you can try the code at Posts DEMO.

**F. CRUDSS**
> Documentation are Coming Soon! For now you can try the code at Posts DEMO.

**G. Validation Message** 
> Documentation are Coming Soon! For now you can try the code at Posts DEMO.

**H. Flash Message** 
> Documentation are Coming Soon! For now you can try the code at Posts DEMO.

**I. Sorting Table** 
> Documentation are Coming Soon! For now you can try the code at Posts DEMO.

**J. User RBAC** 
> Documentation are Coming Soon! For now you can try the code at Posts DEMO.

**K. Pagination** 
> Documentation are Coming Soon! For now you can try the code at Posts DEMO.

**L. Using Meteoris Packages** 
> Documentation are Coming Soon! For now you can try the code at Posts DEMO.

**M. Templating for Desktop Apps** 
> Documentation are Coming Soon! For now you can try the code at Posts DEMO.

**N. Templating for Mobile Apps** 
> Documentation are Coming Soon! For now you can try the code at Posts DEMO.

**O. Sending Email** 
> Documentation are Coming Soon! For now you can try the code at Posts DEMO.

**P. Uploading Files** 
> Documentation are Coming Soon! For now you can try the code at Posts DEMO.

###METEORIS ROADMAP AND CHANGELOG
You can view our roadmap from this link. 
 https://trello.com/b/01SvtPLA/meteoris-roadmap.
if you want to share your idea, just write it in our trello page from that link.

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

