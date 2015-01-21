Meteor.publishComposite('positions', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some Positions with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return Positions.find(doc, sort);
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
            
        ],
    }
});


Meteor.methods({
    "Positions.insert": function(doc) {
        var _id = Positions.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */
/* uncomment to use
 var query = Positions.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
 */