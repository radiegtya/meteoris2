var imageStoreSettings = {
    mongoOptions: {}
  , maxTries: 1 // optional, default 5
  , chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
                          // Default: 2MB. Reasonable range: 512KB - 4MB
};

if (App.mongoBlobUrl != null) {
    imageStoreSettings.mongoUrl = App.mongoBlobUrl;
}

Images = new FS.Collection("images", {
    stores: [new FS.Store.GridFS("images", imageStoreSettings)],
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