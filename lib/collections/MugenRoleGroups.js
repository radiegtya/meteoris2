/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

MugenRoleGroups = new Mongo.Collection("mugenRoleGroups");

var schemas = new SimpleSchema({
    name: {
        type: String,
        label: 'Name',
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
});

MugenRoleGroups.attachSchema(schemas);

MugenRoleGroups.allow({
    insert: function(userId, doc) {
        return userId ? true : false;
    },
    update: function(userId, doc) {
        return doc && doc.createdUserId === userId;
    },
    remove: function(userId, doc) {
        return doc && doc.createdUserId === userId;
    },
});

//activate groundDB for mugenRoleGroups collection to work offline
/* uncomment to use
 Ground.Collection(MugenRoleGroups);
 */

/* register helper for default relations */
MugenRoleGroups.helpers({
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
}); 