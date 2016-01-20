Template.turnoMatic.helpers({
  usuarioAtendido: function(){
    var usuarios = Turnos.find({estado: "atendiendoTurno"}).fetch();
    if(usuarios.length == 1) {
      return Meteor.users.findOne({_id: usuarios[0].usuarioId}).username;
    } else {
      return "nadie";
    }
  },
  teFaltan: function(){
    var usuarios = Turnos.find().fetch();
    var hayAtendido = false;
    var faltan = 0;
    for(var i=0;i<usuarios.length;i++){
      if(usuarios[i].estado == "atendiendoTurno"){
        hayAtendido = true;
      }
      if(usuarios[i].usuarioId == Meteor.userId() 
        && hayAtendido 
        && usuarios[i].estado == "esperandoTurno") return faltan;
      if(hayAtendido) faltan++;
    }
  }
});