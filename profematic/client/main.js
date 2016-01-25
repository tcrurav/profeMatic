Template.body.helpers({
  esProfe: function(){
    //console.log(Meteor.user());
    //console.log(Meteor.user().username);
    //console.log(Meteor.user().username == "tiburcio");
    if(Meteor.user()){
      return (Meteor.user().username == "tiburcio");
    } else {
      return false;
    } 
  }
});

Template.body.events({
  "click #solicitarTurno": function(event){
    //console.log("solicitando");
    event.preventDefault();
    var usuarios = Turnos.find({ usuarioId: Meteor.userId(),
                                  estado: "esperandoTurno" }).fetch();
    //console.log(usuarios);
    if(usuarios.length == 0){
      //console.log("solicitando ya");
      Turnos.insert({usuarioId: Meteor.userId(),
                      estado: "esperandoTurno"});
    }
  },
  "click #soltarTurno": function(event){
    event.preventDefault();
    var usuarios = Turnos.find({ usuarioId: Meteor.userId(),
                                  estado: "esperandoTurno" }).fetch();
    if(usuarios.length == 1){
      //console.log("soltando");
      Turnos.update( usuarios[0]._id, { $set: { estado: "turnoSoltado"}});
    }
  },
  "click #atenderAlSiguiente": function(event){
    event.preventDefault();
    var usuarios = Turnos.find({ estado: "atendiendoTurno" }).fetch();
    if(usuarios.length == 1){
      //console.log("terminando con el actual");
      Turnos.update( usuarios[0]._id, { $set: { estado: "atendidoTurno", fechaFinTurno: new Date()}});
    }
    var usuarios = Turnos.find({ estado: "esperandoTurno" }).fetch();
    if(usuarios.length >= 1){
      //console.log("cogiendo al siguiente");
      Turnos.update( usuarios[0]._id, { $set: { estado: "atendiendoTurno", fechaInicioTurno: new Date()}});
    }
  }
});