/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Speakers = new Mongo.Collection("speakers");

var schemas = new SimpleSchema({
    name: {
        type: String,
        label: 'Nama',
    },
    positionId: {
        type: String,
        label: 'Jabatan',
        optional: true,
    },
    imageId: {
        type: String,
        label: "Image",
        optional: true,
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

Speakers.attachSchema(schemas);

Speakers.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'speakers', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'speakers', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'speakers', 'remove');
        return result;
    },
});

//activate groundDB for speakers collection to work offline
/* uncomment to use
 Ground.Collection(Speakers);
 */

/* register helper for default relations */
Speakers.helpers({
    image: function() {
        return Images.findOne(this.imageId);
    },
    position: function() {
        return Positions.findOne(this.positionId);
    },
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});
