Meteor.publishComposite('posts', function(doc, sort) {
    console.log('subscribing some Posts');
    return{
        find: function() {
            return Posts.find(doc, sort);
        },
        children: [
//            /* return all related AccountClasses */
//            {
//                find: function(collection) {
//                    return ExampleModule.AccountClasses.find({_id: collection.accountClassId});
//                }
//            },
        ],
    }
});