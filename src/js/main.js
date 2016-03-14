//Width and height
var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var urlLink = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

var dataset = [];

//Create scales for x and y before binding data
var xScale = d3.time.scale()
    .range([0, width]);

var yScale = d3.scale.linear()
    .range([height, 0]);

//Create axes
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

//Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top +")");

//Read JSON file and visualize SVG
d3.json(urlLink, function(error, json) {
    //Load JSON data to dataset variable
    dataset = json;


    //Todo: define domain for x and y
    xScale.domain([180, 0]);
    yScale.domain([d3.max(dataset, function(d) {
        return d.Place;
    }), 0]);

    var fastestTime = d3.min(dataset, function(d) {
        return d.Seconds;
    });

    //Todo: Map differences in time from fastest and convert format to mm:ss

    //One way to go about it, think there's a better solution
    var timeDifferences = [];
    for (var i = 0; i < dataset.length; i++) {
        timeDifferences.push(dataset[i].Seconds - fastestTime);
    }

    //Create xAxis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "1.0em")
        .attr("dy", "1.0em")
        .attr("transform", "rotate(0)");

    //Create yAxis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Ranking");

    //Create scatterplot from data
    svg.selectAll("circles")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return xScale(d.Seconds - fastestTime);
        })
        .attr("cy", function(d) {
            return yScale(d.Place);
        })
        .attr("r", "5px")
        .attr("fill", function(d) {
            if (d.Doping === "") {
                return "orange";
            } else {
                return "blue";
            }
        })
        .append("text")
        .attr("dx", function(d) {
            return -20;
        })
        .text("Test");

    console.log(timeDifferences);

    console.log(fastestTime);
    console.log(dataset[0]);
});
