Meteor.publishComposite('posts', function(doc, sort) {
    console.log("subscribing some Posts with it's relation");
    return{
        find: function() {
            return Posts.find(doc, sort);
        },
        children: [
            /* return all related Users */
            {
                find: function(collection) {
                    return Meteor.users.find({
                        $or:[
                            {_id: collection.createdUserId},
                            {_id: collection.updatedUserId},
                        ]
                    });
                }
            },
        ],
    }
});