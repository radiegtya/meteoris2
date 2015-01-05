/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

MugenRoleActions = new Mongo.Collection("mugenRoleActions");

var schemas = new SimpleSchema({
    name: {
        type: String,
        label: 'Name',
    },
    mugenRoleGroupId: {
        type: String,
        label: 'Mugen Role Group',
        optional: true,
    },
    mugenRoleCollectionId: {
        type: String,
        label: 'Mugen Role Collection',
    },
    /* AUTOVALUE */
    appId: {
        type: String,
        label: "App Id",
        autoValue: function() {
            if (this.isInsert)
                return App.id;
        },
    },
    createdAt: {
        type: Date,
        label: "Created Date",
        autoValue: function() {
            if (this.isInsert)
                return new Date;
        },
        denyUpdate: true,
        optional: true
    },
    updatedAt: {
        type: Date,
        label: "Updated Date",
        autoValue: function() {
            return new Date();
        },
        optional: true
    },
//    createdUserId: {
//        type: String,
//        label: "Created by",
//        autoValue: function() {
//            if (this.isInsert)
//                return Meteor.user()._id;
//        },
//        denyUpdate: true,
//        optional: true
//    },
//    updatedUserId: {
//        type: String,
//        label: "Updated by",
//        autoValue: function() {
//            return Meteor.user()._id;
//        },
//        optional: true
//    },
});

MugenRoleActions.attachSchema(schemas);

MugenRoleActions.allow({
    insert: function(userId, doc) {
        return App.activateMugen ? true : false;
    },
    update: function(userId, doc) {
        return App.activateMugen ? true : false;
    },
    remove: function(userId, doc) {
        return App.activateMugen ? true : false;
    },
});

//activate groundDB for mugenRoleActions collection to work offline
/* uncomment to use
 Ground.Collection(MugenRoleActions);
 */

/* register helper for default relations */
MugenRoleActions.helpers({
    mugenRoleGroup: function() {
        return MugenRoleGroups.findOne(this.mugenRoleGroupId);
    },
    mugenRoleCollection: function() {
        return MugenRoleCollections.findOne(this.mugenRoleCollectionId);
    },
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
}); 