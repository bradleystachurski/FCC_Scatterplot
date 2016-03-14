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
    dataset = json;

    var fastestTime = d3.min(dataset, function(d) {
        return d.Seconds;
    });

    //Todo: Map differences in time from fastest and convert format to mm:ss

    //One way to go about it, think there's a better solution
    var timeDifferences = [];
    for (var i = 0; i < dataset.length; i++) {
        timeDifferences.push(dataset[i].Seconds - fastestTime);
    }

    //Create scatterplot from data
    svg.selectAll("circles")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
            return d.Seconds - fastestTime;
        })
        .attr("cy", "10px")
        .attr("r", "5px");

    console.log(timeDifferences);

    console.log(fastestTime);
    console.log(dataset[0]);
});
