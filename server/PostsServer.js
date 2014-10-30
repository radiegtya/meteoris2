Meteor.publishComposite('posts', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some Posts with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return Posts.find(doc, sort);
        },
        children: [
            /* return all related Images */
            {
                find: function(collection) {
                    return Images.find({_id: collection.imageId});
                }
            },
            /* return all related Users */
            {
                find: function(collection) {
                    return Meteor.users.find({
                        $or: [
                            {_id: collection.createdUserId},
                            {_id: collection.updatedUserId},
                        ]
                    });
                }
            },
        ],
    }
});

/* observing collection */
var query = Posts.find({});
var handle = query.observe({
    removed: function(model) {
        //removing related image, when post removed
        Images.remove(model.imageId);
    }
});

Meteor.methods({
    sendPush: function(regid) {
//        // create a message with default values
//        var message = new GCM.Message();
//
//        // or with object values
//        var message = new GCM.Message({
//            collapseKey: 'demo',
//            delayWhileIdle: true,
//            timeToLive: 3,
//            data: {
//                key1: 'message1',
//                key2: 'message2'
//            }
//        });
//
//        var sender = new GCM.Sender('AIzaSyBmWw8HnQo6noi2IWEEfrlrFwIi24ZcoVw');
//        var registrationIds = [];
//
//        // OPTIONAL
//        // add new key-value in data object
//        message.addDataWithKeyValue('key1', 'message1');
//        message.addDataWithKeyValue('key2', 'message2');
//
//        // or add a data object
//        message.addDataWithObject({
//            key1: 'message1',
//            key2: 'message2'
//        });
//
//        // or with backwards compability of previous versions
//        message.addData('key1', 'message1');
//        message.addData('key2', 'message2');
//
//
//        message.collapseKey = 'demo';
//        message.delayWhileIdle = true;
//        message.timeToLive = 3;
//        message.dryRun = true;
//        // END OPTIONAL
//
//        // At least one required
//        registrationIds.push(regid);
////        registrationIds.push('regId2');
//
//        /**
//         * Params: message-literal, registrationIds-array, No. of retries, callback-function
//         **/
//        sender.send(message, registrationIds, 4, function(err, result) {
//            console.log(result);
//        });

        var message = new GCM.Message();

        //API Server Key
        var sender = new GCM.Sender('AIzaSyBmWw8HnQo6noi2IWEEfrlrFwIi24ZcoVw');
        var registrationIds = [];

        // Value the payload data to send...
        message.addData('message', "\u270C Peace, Love \u2764 and PhoneGap \u2706!");
        message.addData('title', 'Push Notification Sample');
        message.addData('msgcnt', '3'); // Shows up in the notification in the status bar
        message.addData('soundname', 'beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
        //message.collapseKey = 'demo';
        //message.delayWhileIdle = true; //Default is false
        message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.

        // At least one reg id required
        registrationIds.push(regid);
        
        console.log(regid);

        /**
         * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
         */
        sender.send(message, registrationIds, 4, function(result) {
            console.log(result);
        });
    }
})