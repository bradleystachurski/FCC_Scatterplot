//Width and height
var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var urlLink = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

var dataset = [];

//Todo: Format minutes (last thing I'll do programming for night of 3/14)

var formatCount = d3.format(",.0f"),
    formatTime = d3.time.format("%H:%M"),
    formatMinutes = function(d) {
        var t = new Date(2016, 0, 1, 0, d);
        console.log(t);
        t.setSeconds(t.getSeconds() + d);
        return formatTime(t);
    };

//Create scales for x and y before binding data
var xScale = d3.scale.linear();

var yScale = d3.scale.linear();

//Create axes
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .tickFormat(formatMinutes);

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


    console.log(d3.max(dataset, function(d) {
        return d.Seconds;
    }) - d3.min(dataset, function(d) {
            return d.Seconds}));

    for (var i = 0; i < dataset.length; i++) {
        dataset[i].SecondsBehind = dataset[i].Seconds - d3.min(dataset, function(d) {
                return d.Seconds});
    }

    console.log(dataset);

    //Todo: define domain for x and y
    xScale.domain([190, 0])
        .range([0, width]);
    yScale.domain([1, 36])
        .range([0, height]);

    var fastestTime = d3.min(dataset, function(d) {
        return d.Seconds;
    });

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
            return xScale(d.SecondsBehind);
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
        });

    //Add names as text label
    //Todo: We're stuck on getting all the names printed. Only partially prints and spent way too long on fixing it.
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d.Name;
        })
        .attr("x", function(d) {
            return xScale(d.SecondsBehind) + 10;
        })
        .attr("y", function(d) {
            return yScale(d.Place) + 4;
        })

    //Todo: Create legend

});
