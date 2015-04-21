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
    "MugenRoleActions.getRoles": function(collection, action) {
        var mugenRoleCollection = MugenRoleCollections.findOne({name: collection});
        var mugenRoleCollectionId = null;
        if (mugenRoleCollection)
            mugenRoleCollectionId = mugenRoleCollection._id;
        var mugenRoleGroupId = Meteor.user() ? Meteor.user().profile.mugenRoleGroupId : null;

        var isAuthenticated = false;
        //if current path is "/" or "mugen" or "user/login | user/register" then make it true
        if (collection == "" || collection == "mugenRoleActions" || collection == "mugenRoleCollections" || collection == "mugenRoleGroups" || collection == 'users' && action == 'login' || collection == 'users' && action == 'register' || collection == 'users' && action == 'forgetPassword' || collection == 'users' && action == 'resetPassword') {
            isAuthenticated = true;
        } else if (mugenRoleCollectionId) {
            var orArray = [
                {mugenRoleGroupId: {$exists: false}},
                {mugenRoleGroupId: null},
                {mugenRoleGroupId: ""},
            ];
            if (mugenRoleGroupId)
                orArray.push({mugenRoleGroupId: mugenRoleGroupId});
            var mugenRoleAction = MugenRoleActions.findOne({mugenRoleCollectionId: mugenRoleCollectionId, name: action,
                $or: orArray
            });
            if (mugenRoleAction)
                isAuthenticated = true;
        }

        return isAuthenticated;
    },
});

/* auto insert into mugenRoleActions "posts" and "meteor.users" when collection still empty */
Meteor.startup(function() {
    var mugenRoleActions = MugenRoleActions.find();
    if (mugenRoleActions.count() == 0) {
        //meteor.users
        MugenRoleActions.insert({name: "index",   mugenRoleCollectionId: "1", mugenRoleGroupId:"1"}); // admin
        MugenRoleActions.insert({name: "view",    mugenRoleCollectionId: "1", mugenRoleGroupId:"1"}); // admin
        MugenRoleActions.insert({name: "insert",  mugenRoleCollectionId: "1", mugenRoleGroupId:"1"}); // admin
        MugenRoleActions.insert({name: "update",  mugenRoleCollectionId: "1", mugenRoleGroupId:"1"}); // admin
        MugenRoleActions.insert({name: "remove",  mugenRoleCollectionId: "1", mugenRoleGroupId:"1"}); // admin

        MugenRoleActions.insert({name: "profile", mugenRoleCollectionId: "1", mugenRoleGroupId:"1"}); // admin
        MugenRoleActions.insert({name: "profile", mugenRoleCollectionId: "1", mugenRoleGroupId:"2"}); // logged in user (@)
        //meteor.posts
        MugenRoleActions.insert({name: "index",   mugenRoleCollectionId: "2"                      }); // anonymous (*)
        MugenRoleActions.insert({name: "view",    mugenRoleCollectionId: "2"                      }); // anonymous (*)

        MugenRoleActions.insert({name: "insert",  mugenRoleCollectionId: "2", mugenRoleGroupId:"1"}); // admin
        MugenRoleActions.insert({name: "update",  mugenRoleCollectionId: "2", mugenRoleGroupId:"1"}); // admin
        MugenRoleActions.insert({name: "remove",  mugenRoleCollectionId: "2", mugenRoleGroupId:"1"}); // admin

        MugenRoleActions.insert({name: "insert",  mugenRoleCollectionId: "2", mugenRoleGroupId:"2"}); // logged in user (@)
        MugenRoleActions.insert({name: "update",  mugenRoleCollectionId: "2", mugenRoleGroupId:"2"}); // logged in user (@)
        MugenRoleActions.insert({name: "remove",  mugenRoleCollectionId: "2", mugenRoleGroupId:"2"}); // logged in user (@)
    }
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

