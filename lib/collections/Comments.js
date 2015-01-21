/**
 * This Code was created on April 2014
 * If you find any bug, unreadable code, messy code, potential bug code, etc
 * Please contact me at:
 * Ega Radiegtya / radiegtya@yahoo.co.id / 085641278479
 */

Comments = new Mongo.Collection("comments");

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
categoryId:{
type:String,
label: 'Kategori',
},
speakerId:{
type:String,
label: 'Pembicara',
},
positionId:{
type:String,
label: 'Jabatan',
optional: true,
},
question:{
type:String,
label: 'Pertanyaan',
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

Comments.attachSchema(schemas);

Comments.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'comments', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'comments', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'comments', 'remove');
        return result;
    },
});

//activate groundDB for comments collection to work offline
/* uncomment to use
 Ground.Collection(Comments);
 */

/* register helper for default relations */
Comments.helpers({
    workshop: function() {
return Workshops.findOne(this.workshopId);
},
province: function() {
return Provinces.findOne(this.provinceId);
},
category: function() {
return Categories.findOne(this.categoryId);
},
speaker: function() {
return Speakers.findOne(this.speakerId);
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
