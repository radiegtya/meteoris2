var fileStore = new FS.Store.GridFS("files", {
  mongoUrl: App.mongoUrl,
  mongoOptions: {},  // optional, see note below  
  maxTries: 1, // optional, default 5
  chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
                        // Default: 2MB. Reasonable range: 512KB - 4MB
});

Files = new FS.Collection("files", {
//    stores: [new FS.Store.FileSystem("files", {path: "/files"})],
    stores: [fileStore],
    filter: {
        maxSize: 1048576, //in bytes
    }
});

Files.allow({
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