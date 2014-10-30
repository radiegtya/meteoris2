/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Posts = new Meteor.Collection("posts");

var schemas = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
    },
    content: {
        type: String,
        label: "Content",
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
    createdDate: {
        type: Date,
        label: "Created Date",
        autoValue: function() {
            if (this.isInsert)
                return new Date;
        },
        denyUpdate: true,
        optional: true
    },
    updatedDate: {
        type: Date,
        label: "Updated Date",
        autoValue: function() {
            if (this.isUpdate || this.isInsert)
                return new Date();
        },
        optional: true
    },
    createdUserId: {
        type: String,
        label: "Created by",
        autoValue: function() {
            if (this.isInsert)
                return this.userId;
        },
        denyUpdate: true,
        optional: true
    },
    updatedUserId: {
        type: String,
        label: "Updated by",
        autoValue: function() {
            if (this.isUpdate || this.isInsert)
                return this.userId;
        },
        optional: true
    },
});

Posts.attachSchema(schemas);

Posts.allow({
    insert: function(userId, doc) {
        return true;
    },
    update: function(userId, doc) {
        return true;
    },
    remove: function(userId, doc) {
        return true;
    },
});

//activate groundDB for posts collection to work offline
GroundDB(Posts);

/* register helper for default relations */
UI.registerHelper('post', function() {
    return Posts.findOne(this.postId);
});