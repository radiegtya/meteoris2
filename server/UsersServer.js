Meteor.publishComposite('users', function(doc) {
    console.log('subscribing some Users');
    return {
        find: function() {
            return Meteor.users.find(doc);
        },
        children: [
        ],
    }
});

Meteor.methods({

});
