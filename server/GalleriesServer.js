Meteor.publishComposite('galleries', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some Galleries with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return Galleries.find(doc, sort);
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
                    return Workshops.find(collection.workshopId);
                }
            },
            /* return all related Images */
            {
                find: function(collection) {
                    return Images.find(collection.imageId);
                }
            },
        ],
    }
});


Meteor.methods({
    "Galleries.insert": function(doc) {
        var _id = Galleries.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */
var query = Galleries.find({});
var handle = query.observe({
    removed: function(model) {
        //removing related image, when post removed
        Images.remove(model.imageId);
    }
});