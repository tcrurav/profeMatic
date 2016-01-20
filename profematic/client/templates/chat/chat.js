Template.chat.helpers({
  intervenciones: function(){
    return Intervenciones.find({},{sort: {createdAt: -1}});
  }
});

Template.chat.events({
  "submit .new-intervencion": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var text = event.target.text.value;
      console.log(text);
 
      // Insert a task into the collection
      Intervenciones.insert({
        text: text,
        createdAt: new Date(), // current time
        nombreUsuario: Meteor.user().username
      });
 
      // Clear form
      event.target.text.value = "";
    }
});