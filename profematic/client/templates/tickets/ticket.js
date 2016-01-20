Template.ticket.events({
  "click .eliminar": function(event){
    event.preventDefault();
    Turnos.remove(this.turnoId);
  }
});