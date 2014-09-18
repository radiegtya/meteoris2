Meteor.publishComposite('images', function(doc, sort) {
    console.log("subscribing some Images with it's relation");
    return{
        find: function() {
            return Images.find(doc, sort);
        },
    }
});