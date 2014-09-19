Template.templateBackendHeaderPhone.events({
    'click #btnLogout': function() {
        Meteor.logout();
    }
});

Template.templateBackendHeaderPhone.helpers({
    breadcrumbs: function() {
        var currentPath = Router.current().path;
        if (currentPath == '/')
            currentPath = 'homeIndex';
//        currentPath = currentPath.replace("/", "");
//        currentPath = currentPath.match(/[A-Z]?[a-z]+|[0-9]+/g);

        var breadcrumbs = toTitleCase(currentPath);
        try {
            if (Router.current().getBreadcrumbs())
                breadcrumbs = Router.current().getBreadcrumbs();
        } catch (e) {            
            console.log(e);
        }

        return breadcrumbs;
    }
});

function toTitleCase(str)
{
    return str.replace("/\w\S*/g", function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}