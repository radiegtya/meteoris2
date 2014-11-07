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


Meteor.methods({
    "Posts.insert": function(doc) {
        var _id = Posts.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */
var query = Posts.find({});
var handle = query.observe({
    removed: function(model) {
        //removing related image, when post removed
        Images.remove(model.imageId);
    }
});