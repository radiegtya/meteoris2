Template.templatePhoneMenu.rendered = function() {
    if (Router.current().path != '/') {
//        console.log($("aside").find('.active').parent().parent().parent().parent().parent().children('.panel-heading').children().children().addClass('active'));
        $("aside").find('li .active').parent().parent().parent().parent().addClass('in');
        $("aside").find('.active').parent().parent().parent().parent().parent().children('.panel-heading').children().children().addClass('active');
//        $("aside").find('.active').parent().parent().parent().parent().parent().children('.panel-heading').children().children().find('.collapsed').addClass('ccc');
    }
}

//AKTIF MENU
Template.templatePhoneMenu.helpers({
    stat: '',
    isActive: function(routes) {
        var currentPath = Router.current().path;

//        if (currentPath != '/') {
//            currentPath = currentPath.replace("/", "");
//            currentPath = currentPath.match(/[A-Z]?[a-z]+|[0-9]+/g);
//            routes = routes.match(/[A-Z]?[a-z]+|[0-9]+/g);
//            if (routes) {
//                if (routes.length == 4) {
//                    if (currentPath[0] + currentPath[1] + currentPath[2] == routes[0] + routes[1] + routes[2])
//                        return 'active';
//                } else if (routes.length == 3) {
//                    if (currentPath[0] + currentPath[1] == routes[0] + routes[1])
//                        return 'active';
//                } else if (routes.length == 2) {
//                    if (currentPath[0] == routes[0])
//                        return 'active';
//                }
//            }
//        } else {
        if (currentPath == '/' + routes)
            return 'active';
//        }
    },
    getPublicMenus: function() {
        return Router.current().getPublicMenus();
    },
});

Template.templatePhoneMenu.events = {
    'click .notification-toggle': function() {
        Widget.slimScroll.run('.slim-scroll');
    },
    /* 
     * when .arrow clicked, if liClassExpand === 'expand' in database then set it to '', 
     * this make arrow being up/down and ul being hidden or not
     */
    'click .arrow': function(e) {
        e.preventPhone();
//        var id = this._id;
//        Router.current().expandMenu(id);
        $(e.target).parent().toggleClass('expand');
    },
    /* set session liClassActive to null first, then set liClassActive with id to make it's class active or not */
    'click .tree li a': function(e) {
        e.preventPhone();
        var id = this._id;
        Session.set('liClasActive', null);
        Session.set('liClassActive', id);
    },
    'mouseover .tree li>.buttons': function(e) {
        $(e.target).parentsUntil('li').parents('li').children('.name').addClass('hover');
    },
    'mouseout .tree li>.buttons': function(e) {
        $(e.target).parentsUntil('li').parents('li').children('.name').removeClass('hover');
    },
}
