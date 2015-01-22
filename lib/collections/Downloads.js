/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Downloads = new Mongo.Collection("downloads");

var schemas = new SimpleSchema({
    workshopId: {
        type: String,
        label: 'Workshop',
    },
    name: {
        type: String,
        label: 'Nama',
        optional: true,
    },
    fileId: {
        type: String,
        label: 'File',
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
    createdUserId: {
        type: String,
        label: "Created by",
        autoValue: function() {
            if (this.isInsert)
                return Meteor.user()._id;
        },
        denyUpdate: true,
        optional: true
    },
    updatedUserId: {
        type: String,
        label: "Updated by",
        autoValue: function() {
            return Meteor.user()._id;
        },
        optional: true
    },
});

Downloads.attachSchema(schemas);

Downloads.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'downloads', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'downloads', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'downloads', 'remove');
        return result;
    },
});

//activate groundDB for downloads collection to work offline
/* uncomment to use
 Ground.Collection(Downloads);
 */

/* register helper for default relations */
Downloads.helpers({
    workshop: function() {
        return Workshops.findOne(this.workshopId);
    },
    file: function() {
        return Files.findOne(this.fileId);
    },
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});
