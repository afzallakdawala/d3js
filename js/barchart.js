function bar_chart(canvas_width, canvas_height, gap_between_bars, div_id) {

  var data = 
    [   
      {"id" :1, "name" : "Nivea", "datapoint" : 25, "color" : "red", "tooltip" : "Nivea data ...... lorem ipsum dollar"},
      {"id" :2, "name" : "Gillette", "datapoint" : 27, "color" : "blue", "tooltip" : "Gillette data ...... lorem ipsum dollar"},
      {"id" :3, "name" : "Nokia", "datapoint" : 100, "color" : "green", "tooltip" : "Nokia data ...... lorem ipsum dollar"},
      {"id" :4, "name" : "Samsung", "datapoint" : 120, "color" : "lightgreen", "tooltip" : "samsung"},
      {"id" :5, "name" : "Acer", "datapoint" : 125, "color" : "steelblue", "tooltip" : "acer"},
      {"id" :6, "name" : "China", "datapoint" : 150, "color" : "yellow", "tooltip" : "china"},
      {"id" :7, "name" : "India", "datapoint" : 175, "color" : "purple", "tooltip" : "Inida"},
      {"id" :8, "name" : "Ruby", "datapoint" : 200, "color" : "skyblue", "tooltip" : "ruby"},
      {"id" :9, "name" : "Rails", "datapoint" : 225, "color" : "orange", "tooltip" : "rails"},
      {"id" :10, "name" : "PHP", "datapoint" : 250, "color" : "pink", "tooltip" : "php"},
      {"id" :11, "name" : "Python", "datapoint" : 275, "color" : "brown", "tooltip" : "python"},
      {"id" :12, "name" : "Hacking", "datapoint" : 300, "color" : "grey", "tooltip" : "hacking"},
      {"id" :13, "name" : "Toshiba", "datapoint" : 325, "color" : "blue", "tooltip" : "toshiba"},
      {"id" :14, "name" : "Coke", "datapoint" : 350, "color" : "#FDEFB5", "tooltip" : "coke"},
      {"id" :16, "name" : "Chineese", "datapoint" : 375, "color" : "darkorange", "tooltip" : "Chineese"},
      {"id" :17, "name" : "Pizza", "datapoint" : 400, "color" : "darkgreen", "tooltip" : "pzza"},
      {"id" :18, "name" : "Sandwhich", "datapoint" : 450, "color" : "darkblue", "tooltip" : "Sandwhich"}

    ];      

  generate_filter_options(data);  

  var min_value = d3_min_value(data);
  var max_value = d3_max_value(data);
  

  var width_scale = d3.scale.linear()
                    .domain([min_value, max_value])
                    .range([0, canvas_width]);

  var axis = generate_axis(width_scale);

  var canvas = generate_canvas(canvas_width, canvas_height, div_id);  

  var bars = generate_bars(data, canvas, width_scale, gap_between_bars);

  var lastY = last_y_axis(data, gap_between_bars);

  generate_axis_scale(canvas, lastY, axis);
  append_text(canvas, data, gap_between_bars);  

}


function generate_canvas(canvas_width, canvas_height, div_id) {
  
  return  canvas = d3.select("#" + div_id)
                  .append("svg")
                  .attr("width", canvas_width)
                  .attr("height", canvas_height)
                  .append("g")
                  .attr("transform", "translate(20,0)");

}

function generate_bars(data, canvas, width_scale, gap_between_bars) {

  return  canvas.selectAll("rect")
                .data(data)
                .enter()
                  .append("rect")
                  .attr("width", function(d)
                                 {return width_scale(d.datapoint);})      
                  .attr("height", 35)
                  .attr("y", function(d, i) { return i * gap_between_bars;})
                  .attr("fill", function(d) {return d.color;})
                  .attr("id", function(d) {return d.id;} )
                  .attr("popover-content", function(d) {return d.tooltip;})
                  ;


}

function generate_axis(width_scale) {
  return d3.svg.axis().scale(width_scale);
}

function random_color(data_max_value) {

 var color = d3.scale.linear()
              .domain([0,data_max_value])
              .range(["green", "steelblue"]);
  
}
function d3_min_value(data) {
  return d3.min(data,function(d) {return d.datapoint});
}

function d3_max_value(data) {
  return d3.max(data,function(d) {return d.datapoint});
}

function last_y_axis(data, gap_between_bars) {

  var Yaxis = 0
  for(i=1; i <= data.length; i++) {
    Yaxis = Yaxis + gap_between_bars
  }

  return Yaxis;

}

function generate_axis_scale(canvas, lastY, axis){
  return  canvas.append("g")                
          .attr("transform", "translate(0," + parseInt(lastY) +")")
          .call(axis);

}

function append_text(canvas, data, gap_between_bars) {
  return canvas.selectAll("text")      
          .data(data)
          .enter()
            .append("text")
            .attr("fill", "black")          
            .attr("y", function(d, i) { return i * gap_between_bars + 20;})
            .text(function(d) {return d.name;});

}

function generate_filter_options(data) {

  var html_output = "";

  $.each( data, function( key, value ) {

    filter_id = value.id;
    filter_name = value.name;
    
    html_output += "<input class='cross_filter' type='checkbox' name='"+
                    filter_id + "' value='"+ filter_name + "' checked>"+
                    filter_name +"<br>";

  });
  
  $(document).ready(function(){
    $("#crossfilter_data").html(html_output);
  });  
    

}



  