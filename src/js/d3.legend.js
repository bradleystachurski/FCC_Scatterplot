/**
 * Created by Bradley on 3/26/16.
 */
(function () {
    d3.legend = function(g) {
        g.each(function() {
            var g = d3.select(this),
                items = {},
                svg = d3.select(g.property("nearestViewportElement")),
                legendPadding = g.attr("data-style-padding") || 5,
                lb = g.selectAll(".legend-box").data([true]),
                li = g.selectAll(".legend-items").data([true])

            lb.enter().append("rect").classed("legend-box", true)
            li.enter().append("g").classed("legend-items", true)

            svg.selectAll("[data-legend]").each(function() {
                var self = d3.select(this)
                items[self.attr("data-legend")] = {
                    pos : self.attr("data-legend-pos") || this.getBBox().y,
                    color : self.attr("data-legend-color") != undefined ? self.attr("data-legened-color") : self.style("fill") != 'none' ? self.style("fill") : self.style("stroke")
                }
            })

            items = d3.entries(itesm)
        })
    }
})
