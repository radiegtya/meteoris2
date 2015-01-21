Meteor.publishComposite('slides', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some Slides with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return Slides.find(doc, sort);
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
            /* return all related Images */
{
find: function(collection) {
return Images.find(collection.imageId);}
},

        ],
    }
});


Meteor.methods({
    "Slides.insert": function(doc) {
        var _id = Slides.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */
/* uncomment to use
 var query = Slides.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
 */