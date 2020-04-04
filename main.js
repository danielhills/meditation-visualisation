
let toggleClass = (i,toggle) => {
  d3.select("#chart div:nth-child("+ i +")").classed("highlightBar",toggle);
  // d3.select("#legend li:nth-child("+ i +")").classed("highlightText",toggle);
};

var svg = d3.select("svg"),
    margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// tooltips
var div = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('display', 'none');
function mouseover() {
  div.style("display", "inline");
}
function mousemove(){
    var d = d3.select(this).data()[0]
    div
      .text(d.date + ': ' + Math.floor(d.duration / 60) + ' mins, ' + d.duration % 60 + ' secs')
      .style('left', (d3.event.pageX - 34) + 'px')
      .style('top', (d3.event.pageY - 12) + 'px');
}
function mouseout(){
    div.style('display', 'none');
}


// bar chart
d3.csv('meditation.csv')
  .then((data) => {
        return data.map((d) => {
          d.duration = +d.duration;
          return d;  
        });
    })
  .then((data) => {
    x.domain(data.map(function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.duration; })]);

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.date); })
        .attr("y", function(d) { return y(d.duration); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.duration); })
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout)
  })





