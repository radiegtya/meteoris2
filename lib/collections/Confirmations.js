/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Confirmations = new Mongo.Collection("confirmations");

var schemas = new SimpleSchema({
    workshopId:{
type:String,
label: 'Workshop',
},
name:{
type:String,
label: 'Nama',
},
provinceId:{
type:String,
label: 'Provinsi',
},
positionId:{
type:String,
label: 'Jabatan',
},
isAttend:{
type:Boolean,
label: 'Hadir',
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

Confirmations.attachSchema(schemas);

Confirmations.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'confirmations', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'confirmations', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'confirmations', 'remove');
        return result;
    },
});

//activate groundDB for confirmations collection to work offline
/* uncomment to use
 Ground.Collection(Confirmations);
 */

/* register helper for default relations */
Confirmations.helpers({
    workshop: function() {
return Workshops.findOne(this.workshopId);
},
province: function() {
return Provinces.findOne(this.provinceId);
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
