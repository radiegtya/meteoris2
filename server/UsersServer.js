Meteor.publishComposite('users', function(id) {
    console.log('subscribing some Users');
    return {
        find: function() {
            return Meteor.users.find(id);
        },
        children: [
        ],
    }
});

Meteor.methods({

});
