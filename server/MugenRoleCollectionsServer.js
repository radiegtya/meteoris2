Meteor.publishComposite('mugenRoleCollections', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some MugenRoleCollections with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return MugenRoleCollections.find(doc, sort);
        },
        children: [
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
    "MugenRoleCollections.insert": function(doc) {
        var _id = MugenRoleCollections.insert(doc);
        return {
            _id: _id,
        }
    },
    "MugenRoleCollections.autoInsert": function(doc) {
        var _id = MugenRoleCollections.insert(doc);
        
        //auto insert to mugenRoleActions for index & view actions
        MugenRoleActions.insert({mugenRoleCollectionId: _id, name: "index"});
        MugenRoleActions.insert({mugenRoleCollectionId: _id, name: "view"});
        
        return {
            _id: _id,
        }
    },
});

/* observing collection */
/* uncomment to use
var query = MugenRoleCollections.find({});
var handle = query.observe({
    removed: function(model) {
        //removing related image, when post removed
        Images.remove(model.imageId);
    }
});
*/