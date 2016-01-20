Template.suTurno.helpers({
  suTurno: function(){
    var turnosQueHay = Turnos.find().fetch();
    for(var i=0;i<turnosQueHay.length;i++){
      if(turnosQueHay[i].estado == "atendiendoTurno"){
        if(i<9) {
          stringOrden = "00"+i;
        } else if(i<99) {
          stringOrden = "0"+i;
        } else {
          stringOrden = i;
        }
        return stringOrden;
      }
    }
    var i = turnosQueHay.length - 1;
    if(i<0){
      stringOrden = "000";
    } else if(i<9) {
      stringOrden = "00"+i;
    } else if(i<99) {
      stringOrden = "0"+i;
    } else {
      stringOrden = i;
    }
    return stringOrden;
  }
});