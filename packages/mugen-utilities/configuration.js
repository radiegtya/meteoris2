MugenUtils = {
    paths: {
                dir_pkg : "packages/{collection}"
      ,      dir_client : "packages/{collection}/client"  
      ,       dir_views : "packages/{collection}/client/views"  
      ,         dir_lib : "packages/{collection}/lib"
      ,      dir_server : "packages/{collection}/server"
      ,          router : "packages/{collection}/client/{collection}Router.js"
      ,           views : "packages/{collection}/client/views/*"
      , viewsActionHtml : "packages/{collection}/client/views/{action}.html"
      ,   viewsActionJs : "packages/{collection}/client/views/{action}.js"
      ,     controllers : "packages/{collection}/lib/{Collection}Controller.js"
      ,     collections : "packages/{collection}/lib/{Collection}.js"
      ,          server : "packages/{collection}/server/{Collection}Server.js"
      ,         package : "packages/{collection}/package.js"
      ,         install : "{nameSpace}:{collection}"
  }
    /* prepare a path from an example path */
  , preparePath: function(element, collection, action, nameNameSpace) {

      return MugenUtils.paths[element]
                 .replace(new RegExp("{collection}", 'g'), collection.toCollectionCase())
                 .replace(new RegExp("{Collection}", 'g'), collection.toProperCase())
                 .replace(new RegExp("{action}", 'g'), action)
                 .replace(new RegExp("{nameSpace}", 'g'), nameNameSpace);

  }

};

