METEORIS v0.2.1
===============

###WHAT IS METEORIS?
Meteoris is a Realtime Javascript Boilerplate base on Meteor Js framework. 
It's help you structuring your Meteor Js apps, and there are many usefull packages inside.

###WHY USING METEORIS?
- Looking a MVC/MVVM/MVP boilerplate for meteor?
- Tired of installing required packages/plugin, searching for best packages?
- Don't know how to structuring your meteor apps or too lazy to restructuring again and again every creating a new project?
- Try to find the best structure for meteor apps?
**METEORIS ARE THE SOLUTION :)**

###WHAT'S INSIDE METEORIS?
Meteoris used standard, usefull, robust and stable for meteor js like Iron Router and Collection2.

**Here are List of packages which Meteoris used:**
- meteor-platform            1.0.2  Include a standard set of Meteor packages i...
- aldeed:collection2         2.0.0  Automatic validation of insert and update o...
- iron:router                0.9.3  Routing specifically designed for Meteor
- meteorhacks:subs-manager   1.1.0  Subscriptions Manager for Meteor
- reywood:publish-composite  1.3.0  Publish a set of documents and their child ...
- accounts-base              1.0.1  A user account system
- accounts-password          1.0.1  Password support for accounts
- mystor:device-detection    0.2.0  Client-Side Device Type Detection & Templat...
- sacha:spin                 2.0.4  Simple spinner package for Meteor
- mizzao:bootstrap-3         3.2.0  HTML, CSS, and JS framework for developing ...
- mizzao:timesync            0.2.2  NTP-style time synchronization between serv...
- jquery                     1.0.0  Manipulate the DOM using CSS selectors
- mrt:moment                 2.8.1  Momentjs, a JavaScript date library for da...
- lepozepo:accounting        1.0.0  Accounting.js -  number, money and currency...
**note: autopublish and insecure package are removed due to security reason.**

###METEORIS ROADMAP AND CHANGELOG
You can view our roadmap from this link. 
 https://trello.com/b/01SvtPLA/meteoris-roadmap.
if you want to share your idea, just write it in our trello page from that link.

------------------------

###DOCUMENTATIONS

**A. Installation**
 
 Before using this, make sure you have installing meteor which version
 greater than equals 0.9.1. To install meteor, run this command "curl
 https://install.meteor.com | /bin/sh". After that, follow this
 instruction:
 
 1. Git clone or download this repo. "git clone https://github.com/radiegtya/meteoris.git"
 2. Rename file to your desired name "ex: meteoris to myproject"
 3. Change dir to your apps then just run "sudo meteor". Then type "localhost:3000" in your browser.
 4. There will be a running DEMO to get you started easily. Register your account from registration page, then  loging in using those
 account. You can then use the demo CRUDSS app.

**B. Folder Structure**
```
client/ 				# Client folder
    assets/             # Packages with global variable
    configs/            # Configuration files on the client
	templates/          # Custom your template here
    views/              # Your views files 
lib/ 					# Executed both from client/server
    applications/       # framework base classes
    collections/        # Your collection files
    controllers/        # Your controllers files
    router.js           # Your routing location
public/ 			    # Your images or file
server/ 			    # Server folder
```

**C. Routing, Controller and Views**

*1. What is Controller*
Controller are class which responsible for storing dynamic data to view.
*2. Creating Controller*
Let's create simple controller named PostsController that extends MeteorisController.
```
PostsController = MeteorisController.extend({

});
```
> save this file in "lib/controllers/PostsController.js"

*3. Creating function inside Controller*
```
PostsController = MeteorisController.extend({
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
> save this file in "lib/controllers/PostsController.js"

function data is responsible to storing dynamic data to be displayed to the view. Create a view with related name, remember this is the best practice using naming convention in Meteoris.

*4. Creating html page to be used for Controller*
```
<template name="postsIndex">
	<p>{{helloWorld}}</p>
	<p>{{otherMessage}}</p>
</template>
```
> save this file in "client/views/posts/index.html"

*5. Setup your router* 
Router responsible for url formatting, for example you want to redirect user to "AppName/posts/index". You can make routing like this. 

> Best practice note: 
> - AppName is your apps name
> - posts is your controller name or your folder in views name
> -  index is your view name inside folder posts
> This is little different from MVC concept like other framework did, which index is 
>  function name from the controller. It's Because we are using MVVM concept.

```
    /* POSTS */
    this.route('postsIndex', { //targetted template
        path: 'posts/index/', //desired path
        controller: PostsController, //targetted controller
    });
``` 

> save this file in "lib/router.js"

*6. running your app*
To run your apps, use this url http://localhost:3000/posts/index.
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

**M. Sending Email** 
> Documentation are Coming Soon! For now you can try the code at Posts DEMO.