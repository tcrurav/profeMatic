Template.menuArriba.helpers({
  esProfe: function(){
    if(Meteor.user().username == "tiburcio") {
      return true;
    } else {
      return false;
    }
  }
});