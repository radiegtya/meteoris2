Meteor.publishComposite('workshopsSpeakers', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some WorkshopsSpeakers with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return WorkshopsSpeakers.find(doc, sort);
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
            /* return all related Speakers */
            {
                find: function(collection) {
                    return Speakers.find(collection.speakerId);
                }
            },
        ],
    }
});


Meteor.methods({
    "WorkshopsSpeakers.insert": function(doc) {
        var _id = WorkshopsSpeakers.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */
/* uncomment to use
 var query = WorkshopsSpeakers.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
 */