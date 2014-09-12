Meteor.publishComposite('users', function(id) {
    console.log('subscribing some Users');
    return {
        find: function() {
            return Meteor.users.find(id);
        },
        children: [
//            /* return all related Jobs in HRM module */
//            {
//                find: function(collection) {
//                    return Hrm.Jobs.find({_id: collection.profile.hrm_jobId});
//                }
//            },
        ],
    }
});

Meteor.methods({

});
