var width = 960,
    height = 480;

var svg = d3.select('body').append('svg')

var projection = d3.geo.equirectangular()
    .scale(15)
    .translate([width / 2.5, height / 2.5])
    .precision(.2);

var path = d3.geo.path()
    .projection(projection);

var graticule = d3.geo.graticule().step([.3, .3]);

d3.json("topo/TZA_adm2.topojson", function(error, tz) {
	console.log(tz)

	var adm2 = topojson.feature(tz, tz.objects.TZA_adm2);

	projection
		.scale(1)
		.translate([0, 0]);

	var b = path.bounds(adm2),
		s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
		t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

	projection
		.scale(s)
		.translate(t);

	svg.append("path")
    	.datum(graticule)
    	.attr("class", "graticule")
    	.attr("stroke", "#a1dab4")
    	.attr("d", path);

	svg.append("path")
		.datum(adm2)
		.attr("class", "land")
		.attr("d", path)
		.style("fill", '#cec')

	svg.append("path")
		.datum(topojson.mesh(tz, tz.objects.TZA_adm2, function(a, b) { return a !== b; }))
		.attr("d", path)
		.attr("fill", 'none')
		.attr("stroke", '#ccc')

	render()

});

function render() {
	svg
		.selectAll('circle')
			.data(readings)
			.enter()
			.append('circle')
				.attr("fill", '#41b6c4')
				.each(function(d) {
					var xy = projection([d.lng, d.lat])
					console.log(xy)
					// var xy = projection([d.lat, d.lng])
					d3.select(this)
						.attr('cx', xy[0])
						.attr('cy', xy[1])
						.attr('cy', Math.abs(xy[1]))
						.attr('r', 3)
				})

}
