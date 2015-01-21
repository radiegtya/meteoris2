Meteor.publishComposite('files', function(doc, sort) {
    console.log("subscribing some Files with it's relation");
    return{
        find: function() {
            return Files.find(doc, sort);
        },
    }
});