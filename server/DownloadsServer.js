Meteor.publishComposite('downloads', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some Downloads with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return Downloads.find(doc, sort);
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
/* return all related Files */
{
find: function(collection) {
return Files.find(collection.fileId);}
},

        ],
    }
});


Meteor.methods({
    "Downloads.insert": function(doc) {
        var _id = Downloads.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */
/* uncomment to use
 var query = Downloads.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
 */