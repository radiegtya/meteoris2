Meteor.publishComposite('mugenRoleActions', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some MugenRoleActions with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return MugenRoleActions.find(doc, sort);
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
            /* return all related MugenRoleGroups */
            {
                find: function(collection) {
                    return MugenRoleGroups.find(collection.mugenRoleGroupId);
                }
            },
            /* return all related MugenRoleCollections */
            {
                find: function(collection) {
                    return MugenRoleGroups.find(collection.mugenRoleCollectionId);
                }
            },
        ],
    }
});


Meteor.methods({
    "MugenRoleActions.insert": function(doc) {
        var _id = MugenRoleActions.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */
/* uncomment to use
 var query = MugenRoleActions.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
 */