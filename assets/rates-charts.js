// function for sorting CSV data for charts displaying totals
function sortRatesData(data) {
    // define variables used later on
    var dateTimes = [];
    var dataValues = [];
    var i = 0;

    // split received data into lines
    var lines = data.split("\n");
    // split each line into labels and data values
    lines.forEach(function(line, index) {
        if (index != 0 && index != (lines.length - 1)) {
            var items = line.split(",");
            dateTimes.push(items[0]);
            dataValues.push(Number(items[1]));
        }
    });

    // define variable to hold final data
    var chartData = [];

    // format data correctly
    dateTimes.forEach(function(dateTime, index) {
        chartData.push({ y: dateTime, x: dataValues[index] });
    });

    // return data
    return chartData;
}

// function for auto-updating doughnut charts
function updateRates(chart, csvFileLocation) {
    // retrieve new data
    $.get(csvFileLocation, function(fileContent) {
        // change data on chart to correctly-formatted new data
        chart.setData(sortRatesData(fileContent));
    });
}

// function for compiling options for chart configuration
function getRatesOptions(fileContent, chartTarget) {
    // return config options including correctly-formatted data
    return {
        element: chartTarget,
        data: sortRatesData(fileContent),
        xkey: 'y',
        ykeys: 'x',
        // TODO: add units
        yLabelFormat: function(y) { return y.toString() + "UNIT"; },
        postUnits: "UNITS",
        dateFormat: function (x) {
            return new Date(x).toString().split(" GMT")[0];
        },
        labels: ['Water Flowrate'],
        fillOpacity: 0.6,
        hideHover: 'auto',
        behaveLikeLine: true,
        resize: true,
        pointSize: 2,
        pointFillColors:['#ffffff'],
        pointStrokeColors: ['black'],
        lineColors:['gray','red'],
        smooth: true
  }
}
