/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

WorkshopsSpeakers = new Mongo.Collection("workshopsSpeakers");

var schemas = new SimpleSchema({
    workshopId: {
        type: String,
        label: 'Workshop',
    },
    speakerId: {
        type: String,
        label: 'Pembicara',
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

WorkshopsSpeakers.attachSchema(schemas);

WorkshopsSpeakers.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'workshopsSpeakers', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'workshopsSpeakers', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'workshopsSpeakers', 'remove');
        return result;
    },
});

//activate groundDB for workshopsSpeakers collection to work offline
/* uncomment to use
 Ground.Collection(WorkshopsSpeakers);
 */

/* register helper for default relations */
WorkshopsSpeakers.helpers({
    workshop: function() {
        return Workshops.findOne(this.workshopId);
    },
    speaker: function() {
        return Speakers.findOne(this.speakerId);
    },
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});
