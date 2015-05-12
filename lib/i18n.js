Meteor.startup(function(){
  if (Meteor.isClient){
     if (App.defaultLanguage) {
       return TAPi18n.setLanguage(App.defaultLanguage);
     } else {
       return TAPi18n.setLanguage('en');
     }
  }
});
