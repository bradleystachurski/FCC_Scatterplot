//Width and height
var margin = {top: 110, right: 120, bottom: 80, left: 120},
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var urlLink = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

var dataset = [];

//Add format for minutes:seconds
var formatTime = d3.time.format("%M:%S"),
    formatMinutes = function(d) {
        var t = new Date(2016, 0, 1, 0);
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

//Just the tip...
var tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-10, 0])
    .html(function (d) {
        var caughtDoping = "";

        if (d.Doping !== "") {
            caughtDoping = d.Doping;
        } else {
            caughtDoping = "Not yet...";
        }

        var toolTipDetails = "Name: " + d.Name + "<br>" + "Country: " + d.Nationality +
                    "<br>" + "Year: " + d.Year + "<br>" + "Place: " + d.Place + "<br>" + "Time: " + d.Time +
                    "<br> <br>" + "Doping: " + caughtDoping;
            ;
        return "<span style='color: black'>" + toolTipDetails + "</span>"
    });

svg.call(tip);

//Read JSON file and visualize SVG
d3.json(urlLink, function(error, json) {
    //Load JSON data to dataset variable
    dataset = json;

    //Add variable SecondsBehind to the dataset
    for (var i = 0; i < dataset.length; i++) {
        dataset[i].SecondsBehind = dataset[i].Seconds - d3.min(dataset, function(d) {
                return d.Seconds});
    }

    //Todo: define domain for x and y
    xScale.domain([190, 0])
        .range([0, width]);
    yScale.domain([1, 36])
        .range([0, height]);

    var fastestTime = d3.min(dataset, function(d) {
        return d.Seconds;
    });

    //Add names as text label
    //Todo: We're stuck on getting all the names printed. Only partially prints and spent way too long on fixing it.
    //Alright, this code works now that it's above where I .enter() the dataset for the circles and the other
    //text elemnts. Need to figure out why it's doing that. Kinda fucked
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
        .attr("y", -35)
        .attr("dy", ".71em")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
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
                return "rgb(0, 209, 193)";
            } else {
                return "rgb(255, 88, 91)";
            }
        })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);

    var dataNames = [];
    for (var i = 0; i < dataset.length; i++) {
        dataNames.push(dataset[i].Name);
    }
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
        });


    console.log(dataNames);

    //Todo: Create axis labels
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", (height + (margin.bottom / 2)))
        .attr("text-anchor", "middle")
        .attr("width", width)
        .attr("font-weight", "bold")
        .style("font-size", "12px")
        .style("font-family", "arial")
        .style("text-decoration", "none")
        .text("Minutes Behind Fastest Time");

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", (margin.top / 2) - 100)
        .attr("text-anchor", "middle")
        .attr("width", width)
        .style("font-size", "25px")
        .style("font-family", "arial")
        .style("text-decoration", "none")
        .text("Doping in Professional Bicycle Racing");

    //Todo: Create legend

});
