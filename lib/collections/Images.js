var imageStore = new FS.Store.GridFS("images", {
  mongoUrl: App.mongoUrl,
  mongoOptions: {},  // optional, see note below  
  maxTries: 1, // optional, default 5
  chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
                        // Default: 2MB. Reasonable range: 512KB - 4MB
});

Images = new FS.Collection("images", {
//    stores: [new FS.Store.FileSystem("images", {path: "/images"})],
    stores: [imageStore],
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