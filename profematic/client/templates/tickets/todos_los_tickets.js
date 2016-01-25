Template.todosLosTickets.helpers({
  tickets: function(){
    var todosLosTurnos = Turnos.find().fetch();
    var turnosAMostrar = [];
    for(var i=0 ; i<todosLosTurnos.length ; i++){
      //console.log(todosLosTurnos[i].usuarioId);
      var usuario = Meteor.users.findOne( { _id: todosLosTurnos[i].usuarioId });
      //console.log(usuario);
      if(i<9) {
        stringOrden = "00"+i;
      } else if(i<99) {
        stringOrden = "0"+i;
      } else {
        stringOrden = i;
      }
      if(todosLosTurnos[i].estado != "esperandoTurno" &&
         todosLosTurnos[i].estado != "atendiendoTurno"){
            noValido = true;
      } else {
            noValido = false;
      }
      //console.log(stringOrden);
      if(Meteor.user().username == "tiburcio"){
        esProfesor = true;
      } else {
        esProfesor = false;
      }
      turnosAMostrar.push({ orden: stringOrden,
                              estado: todosLosTurnos[i].estado,
                              nombreUsuario: usuario.username,
                              turnoId: todosLosTurnos[i]._id,
                              notValid: noValido,
                              esProfesorete: esProfesor
                            });
      //console.log(turnosAMostrar);
    }
    return turnosAMostrar;
  }
});