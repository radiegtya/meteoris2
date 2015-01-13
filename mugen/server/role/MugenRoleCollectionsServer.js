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
        //check whether collection already there or not, if yes don't reinsert, else insert
        var mugenRoleCollection = MugenRoleCollections.findOne({name: doc.name});
        var _id = null;
        if (!mugenRoleCollection)
            _id = MugenRoleCollections.insert(doc);
        else
            _id = mugenRoleCollection._id;

        //check whether mugenRoleActions already there or not, if yes don't reinsert, else auto insert
        if (!MugenRoleActions.findOne({mugenRoleCollectionId: _id, name: "index"}))
            MugenRoleActions.insert({mugenRoleCollectionId: _id, name: "index"});
        if (!MugenRoleActions.findOne({mugenRoleCollectionId: _id, name: "view"}))
            MugenRoleActions.insert({mugenRoleCollectionId: _id, name: "view"});
        if (!MugenRoleActions.findOne({mugenRoleCollectionId: _id, name: "insert", mugenRoleGroupId: "1"}))
            MugenRoleActions.insert({mugenRoleCollectionId: _id, name: "insert", mugenRoleGroupId: "1"});
        if (!MugenRoleActions.findOne({mugenRoleCollectionId: _id, name: "update", mugenRoleGroupId: "1"}))
            MugenRoleActions.insert({mugenRoleCollectionId: _id, name: "update", mugenRoleGroupId: "1"});
        if (!MugenRoleActions.findOne({mugenRoleCollectionId: _id, name: "remove", mugenRoleGroupId: "1"}))
            MugenRoleActions.insert({mugenRoleCollectionId: _id, name: "remove", mugenRoleGroupId: "1"});

        return {
            _id: _id,
        }
    },
});

/* auto insert into mugenRoleCollections "posts" and "meteor.users" when collection still empty */
Meteor.startup(function() {
    var mugenRoleCollections = MugenRoleCollections.find();
    if (mugenRoleCollections.count() == 0) {
        MugenRoleCollections.insert({_id: "1", name: "users"});
        MugenRoleCollections.insert({_id: "2", name: "posts"});
    }
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