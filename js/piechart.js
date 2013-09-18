function pie_chart_init(json_data, chart_width, chart_height, donut, automated_color) {

  var pie = d3.layout.pie().value(function(d) {return d[1];});  
  var outerRadius = chart_width / 2;
  var innerRadius = generate_donut(donut, chart_width);

  var arc  = generate_arc(outerRadius, innerRadius);
  var svg  = generate_svg(chart_width, chart_height);
  var arcs = generate_arcs(pie, json_data, svg, outerRadius, innerRadius);

  generate_colors(automated_color, json_data, arcs, arc);
  generate_text(arcs, json_data, arc);

}

function generate_donut(donut, chart_width) {
  
  if (donut.create) {
    return chart_width / donut.radius;
  }else {
    return 0;
  }

}

function generate_arc(outerRadius, innerRadius) {
  return d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);
}

function generate_svg() {
  return  d3.select("body")
            .append("svg")
            .attr("width", chart_width)
            .attr("height", chart_height);
}

function generate_arcs(pie, json_data, svg, outerRadius, innerRadius) {

  return  arcs = svg.selectAll("g.arc")
          .data(pie(dataset))
          .enter()
          .append("g")
          .attr("class", "arc")
          .attr("transform", "translate(" + outerRadius +
                ", " + outerRadius + ")");
}

function generate_colors(automated_color, json_data, arcs, arc) {

  if (automated_color) {
    var color = d3.scale.category10();
  }

  return arcs.append("path")
        .attr("fill", function(json_data, i) {
                        
                        if (automated_color) {
                          return color(i);    
                        }else {
                          return json_data.data[2];
                        }

                      
    }).transition()
      .delay(function(json_data, i) {
              return i * 100;
              })
      .duration(1300)
    .attr("d", arc)        

;

}

function generate_text(arcs, json_data, arc) {
  return arcs.append("text")
          .attr("transform", function(json_data) {
            return "translate(" + arc.centroid(json_data) + ")";
          })
          .attr("text-anchor", "middle")
          .attr("fill", "white")
          .style("font-size", "12px")
          .style("font-family", "Helvetica Neue,Helvetica,Arial,sans-serif")
          .text(function(json_data) {
            return json_data.data[0] ;
          })
          .attr("class", "tool")
          .attr("tooltip", function(json_data) {
            return json_data.data[3]; })
          ;
}