Meteor.publishComposite('comments', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some Comments with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return Comments.find(doc, sort);
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
            /* return all related Workshops */
{
find: function(collection) {
return Workshops.find(collection.workshopId);}
},
/* return all related Provinces */
{
find: function(collection) {
return Provinces.find(collection.provinceId);}
},
/* return all related Categories */
{
find: function(collection) {
return Categories.find(collection.categoryId);}
},
/* return all related Speakers */
{
find: function(collection) {
return Speakers.find(collection.speakerId);}
},
/* return all related Positions */
{
find: function(collection) {
return Positions.find(collection.positionId);}
},

        ],
    }
});


Meteor.methods({
    "Comments.insert": function(doc) {
        var _id = Comments.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */
/* uncomment to use
 var query = Comments.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
 */