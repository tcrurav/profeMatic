Meteor.startup(function() {

    return Meteor.methods({

      quitarTodosLosTurnos: function() {

        return Turnos.remove({});

      }

    });

  });