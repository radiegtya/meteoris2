Meteor.publishComposite('mugenRoleGroups', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some MugenRoleGroups with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return MugenRoleGroups.find(doc, sort);
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
    "MugenRoleGroups.insert": function(doc) {
        var _id = MugenRoleGroups.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* auto insert into mugenRoleGroup "@" and "admin" when collection still empty */
Meteor.startup(function() {
    var mugenRoleGroups = MugenRoleGroups.find();
    if (mugenRoleGroups.count() == 0) {
        MugenRoleGroups.insert({_id: "1", name: "admin"});
        MugenRoleGroups.insert({_id: "2", name: "@"});        
    }
});

/* observing collection */
/* uncomment to use
 var query = MugenRoleGroups.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
 */