Meteor.publishComposite('speakers', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some Speakers with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return Speakers.find(doc, sort);
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
            /* return all related Positions */
{
find: function(collection) {
return Positions.find(collection.positionId);}
},

        ],
    }
});


Meteor.methods({
    "Speakers.insert": function(doc) {
        var _id = Speakers.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */
/* uncomment to use
 var query = Speakers.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
 */