Template.frontend_postsView.events = {
};

Template.frontend_postsView.helpers({
    /* get related imageId from images collection */
    image: function() {
        return Images.findOne(this.imageId);
    },
    /* get related createdUserId from users collection */
    createdUser: function() {
        return Meteor.users.findOne(this.createdUserId);
    },
    /* get related updatedUserId from users collection */
    updatedUser: function() {
        return Meteor.users.findOne(this.updatedUserId);
    },
});