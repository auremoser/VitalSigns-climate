var series = [];
var datesIncluded = [];
var averageTemps = {};

var options = {
    colors: [
        // colors taken from the palette on this site: http://vitalsigns.org/
         '#FFCC33', '#4E733D', '#C04420', '#6E9962', '#9DCBDA', '#FBD8DB', '#fc8d59'
    ],
	title: {
        text: 'Mean Temperature August 2010'
    },
    chart: {
        renderTo: 'container',
        defaultSeriesType: 'line',
    },
    credits: {
        enabled: false
    },

    xAxis: {
        categories: []
    },
    yAxis: {
        title: {
            text: 'Mean Temperature (C)'
        }
    },
    tooltip: {
        valueSuffix: '°C',
    },
};

$.get('data/climate_data/CLM-Data_Entry-v3/Data-Table-1.csv', function(data) {

    var lines = data.split('\n');
    $.each(lines, function(lineNo, line) {
        var items = line.split(',');

        if (lineNo > 0) {
        	var found = $.inArray(items[1], datesIncluded);

        	if(found == -1) {
        		datesIncluded.push(items[1]);
        		averageTemps[items[1]] = parseFloat(items[6]);
        	} else {
        		averageTemps[items[1]] += parseFloat(items[6]);
        	}

            series.push(parseFloat(items[6]));
        }
    });

	$.each(averageTemps, function(dayNo, value) {
		averageTemps[dayNo] = value/12;
		averageTemps[dayNo] = parseFloat(averageTemps[dayNo].toFixed(2));
	});

	var averageTempsArray = $.map(averageTemps, function(value, index) {
    	return [value];
	});

	options.xAxis.categories = datesIncluded;
	options.series = [{ data: averageTempsArray,
						name: 'Serial # 5500000016036E41',
                        color: '#238b45'
					}];

    var chart = new Highcharts.Chart(options);
});