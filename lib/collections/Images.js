Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: "/uploads"})],
    filter: {
        maxSize: 1048576, //in bytes
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        },
    }
});

Images.allow({
    insert: function(userId, doc) {
        return true;
    },
    update: function(userId, doc) {
        return true;
    },
    remove: function(userId, doc) {
        return true;
    },
    download: function(userId, doc) {
        return true;
    },
});