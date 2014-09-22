Backend.SitesController = MeteorisController.extend({    
    /* set layout template to backend */
    layoutTemplate: 'backend', 
    /* get subscribtion from server with parameter criteria, and sort/limit */
    waitOn: function() {        
    },
    /* passing data from controllers to view */
    data: function() {        
        return {            
        };
    },    
});