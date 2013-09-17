function bar_chart_init(data,margin, width, height, categories, div_id) {

  var x = d3.scale.ordinal().domain(categories).rangePoints([10, width - 30]);
  var y = d3.scale.linear().domain([0,width]).range([height,0]);

  var xAxis = generate_x_axis(x);
  var yAxis = generate_y_axis(y);
  var svg = svg_init(div_id, width, height, margin);

  var axis_label_rotation = -45;
  var about_chart_y = "Total handset sold"
  var about_chart_x = "Smart phones"

  generate_svg_y_header(svg,about_chart_y, height);
  generate_svg_x_header(svg,about_chart_x, width, height)
  generate_svg_x_axis(svg, xAxis, height, axis_label_rotation);
  generate_svg_y_axis(svg, yAxis, height);
  generate_bars(data, svg, x, y);

}

function generate_x_axis(x) {
  return d3.svg.axis().scale(x).orient("bottom");
}

function generate_y_axis(y) {
  return d3.svg.axis().scale(y).orient("left");
}

function svg_init(div_id, width, height, margin) {
  return d3.select("#" + div_id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom +30)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," +
               margin.top + ")");
}

function generate_svg_x_axis(svg, xAxis, height, axis_label_rotation) {

  var turn_label = 0;
  if (axis_label_rotation !== "") {
    var turn_label = "rotate(" + axis_label_rotation +  ")";
  }

  return svg.append("g").attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.18em")
            .attr("dy", "0em")
            .attr("transform", turn_label )
            .attr("fill", "blue")
}

function generate_svg_y_header(svg,about_chart, height) {
  return svg.append("text")
          .attr("text-anchor", "middle")          
          .attr("x", -1 * (height / 2) )
          .attr("y", -37 )
          .style("font-size", "11px") 
          .attr("fill", "grey")  
          .text(about_chart)
          .attr("transform", "rotate(-90)" );
}

function generate_svg_x_header(svg,about_chart, width, height) {
  return svg.append("text")
          .attr("text-anchor", "middle")          
          .attr("x", 1 * (width / 2) )
          .attr("y", height + 55 )
          .style("font-size", "11px") 
          .attr("fill", "grey")  
          .text(about_chart);
}

function generate_svg_y_axis(svg, yAxis, height) {
  return svg.append("g").attr("class", "y axis").call(yAxis);
}

function generate_bars(data, svg, x, y) {
  return  svg.selectAll("rect").data(data)
          .enter()
            .append("rect")
              .attr("x", function(d,i) {return x(d[0]) - 7 ;})
              .attr("y", function(d) {return y(d[1]);})              
              .attr("width",20)
              .attr("height", function(d) {return height - y(d[1]);})
              .attr("title", function(d) {return d[0] ;})
              .attr("popover-content", function(d) {return d[3] ;})
              .transition()
              .delay(function(d, i) {
              return i * 50;
              })
              .duration(1300)

              .style("fill",function(d) {return d[2];});  
}

function generate_dummy_data() {
  return [
            ["nokia",100, "red", "<h1>Nokia</h1> saleskfjlkasjfsa"],
            ["samsung",250, "blue", "<h1>samsung</h1> saleskfjlkasjfsa"],
            ["sony", 50, "green", "<h1>sony </h1>saleskfjlkasjfsa"],
            ["micromax",350, "orange", "<h1>micromax</h1> saleskfjlkasjfsa"],
            ["lava",100, "yellow", "<h1>lava</h1> saleskfjlkasjfsa"],
            ["blackberry",250,"pink", "<h1>blackberry</h1> saleskfjlkasjfsa"],
            ["lenova", 50,"teal", "<h1>lenova</h1> saleskfjlkasjfsa"],
            ["china",350,"grey", "<h1>china</h1> saleskfjlkasjfsa"],
            ["seimens", 2, "lightblue", "<h1>seimens</h1> saleskfjlkasjfsa"],
            ["panasonic", 11, "navyblue", "<h1>panasonic </h1>saleskfjlkasjfsa"],
            ["alcatel", 25, "lightgreen", "<h1>alcatel</h1> saleskfjlkasjfsa"]
          ];

}