Meteor.publishComposite('workshopsCategories', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some WorkshopsCategories with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return WorkshopsCategories.find(doc, sort);
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
/* return all related Categories */
{
find: function(collection) {
return Categories.find(collection.categoryId);}
},

        ],
    }
});


Meteor.methods({
    "WorkshopsCategories.insert": function(doc) {
        var _id = WorkshopsCategories.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */
/* uncomment to use
 var query = WorkshopsCategories.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
 */