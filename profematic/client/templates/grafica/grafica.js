Template.grafica.onRendered( function(){
    //I thought .rendered is deprecated? Correct. Updated.
    //define constants, height/width
    var margin = {top: 10, right: 20, bottom: 30, left: 40},
        width = 500 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    //define scales and axes
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(3);

    //define key function to bind elements to documents
    //var key = function(d) {
    //    return d._id;
    //};

    //define the SVG element by selecting the SVG via its id attribute
    var svg = d3.select("#barChart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

    svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Segundos");

    //declare a Deps.autorun block
    Deps.autorun(function(){

        //perform a reactive query on the collection to get an array
        var dataset = [];
        var usuarios = Meteor.users.find({username: { $ne: "tiburcio"} }).fetch();
        for (var i=0; i<usuarios.length;i++){
            var turnos = Turnos.find({ usuarioId: usuarios[i]._id, estado: "atendidoTurno"}).fetch();
            var tiempoConsumido = 0;
            console.log(tiempoConsumido);
            for (var j=0; j<turnos.length; j++){
                tiempoConsumido += turnos[j].fechaFinTurno.getTime() - turnos[j].fechaInicioTurno.getTime();
                console.log(tiempoConsumido);
            }
            tiempoConsumido = Math.round(tiempoConsumido/1000);
            //console.log("fin");
            //console.log(tiempoConsumido);
            dataset.push({ username: usuarios[i].username, tiempoConsumido: tiempoConsumido//, _id: usuaios[i]._id
            });
            //console.log(dataset);
        }
        dataset.sort(function(a, b){return b.tiempoConsumido-a.tiempoConsumido}); //se ordenan de mayor a menor tiempoConsumido
        if(dataset.length==0){
            $("#barChart").hide();
        } else {
            if(dataset[0].tiempoConsumido==0){
                $("#barChart").hide();
            }else{
                $("#barChart").show();
            }
        }
        dataset.slice(0,10); //sólo se muestran los 10 primeros
        dataset.sort(function(a, b){return a.tiempoConsumido-b.tiempoConsumido}); //se ordenan de mayor a menor tiempoConsumido

        //update scale domains and axises
        x.domain(dataset.map(function(d) { return d.username; }));
        y.domain([0, d3.max(dataset, function(d) { return d.tiempoConsumido; })]);

        //Update X axis
        svg.select(".x.axis")
            .transition()
            .duration(1000)
            .call(xAxis);
        
        //Update Y axis
        svg.select(".y.axis")
            .transition()
            .duration(1000)
            .call(yAxis);

        //select elements that correspond to documents
        var barras = svg.selectAll(".bar")
          .data(dataset//, key
            );
        

        //handle new documents via enter()
        barras.enter()
            .append("rect")
              .attr("class", "bar")
              .attr("x", function(d) { return x(d.username); })
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.tiempoConsumido); })
              .attr("height", function(d) { return height - y(d.tiempoConsumido); })
              //.attr("data-id", function(d) { return d._id; })
              ;       

        //handle updates to documents via transition()
        barras.transition()
            .duration(500)
              .attr("x", function(d) { return x(d.username); })
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.tiempoConsumido); })
              .attr("height", function(d) { return height - y(d.tiempoConsumido); });


        //handle removed documents via exit()
        barras.exit()
            .transition()
            .duration(500)
            .attr("x", -x.rangeBand())
            .remove();
    });
});                        