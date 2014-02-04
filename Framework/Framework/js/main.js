/**
THIS FUNCTION IS CALLED WHEN THE WEB PAGE LOADS. PLACE YOUR CODE TO LOAD THE 
DATA AND DRAW YOUR VISUALIZATION HERE. THE VIS SHOULD BE DRAWN INTO THE "VIS" 
DIV ON THE PAGE.

This function is passed the variables to initially draw on the x and y axes.
**/

var margin = {top: 20, right: 20, bottom: 30, left: 40};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);


var data;
var curXValue;
var curYValue;
function init(xAxis, yAxis){
	d3.csv("data/data.csv", 
		function(d){
			return {
				compactness:+d.compactness,
				kernelLength:+d.kernelLength,
				kernelWidth:+d.kernelWidth,
				asymmetryCoefficient:+d.asymmetryCoefficient,
				grooveLength:+d.grooveLength,
				variety:d.variety
			};
		},
		function(error, rows) {
			data = rows;
			//printData();
			redrawGraph("kernelLength","kernelWidth");
		}
	);
}


function printData(){
	var value = "compactness";
	d3.select("#vis").selectAll("p")
		.data(data)
		.enter().append("p")
		.text(function(d) { return eval("d."+value) +" " + d.kernelLength + " " + d.kernelWidth + " " + d.asymmetryCoefficient + " " + d.grooveLength + " " + d.variety + " "; });
}

function redrawGraph(xValue, yValue){
	d3.select('svg').remove();
	var svg = d3.select("#vis").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
		
	// x.domain(d3.extent(data, function(d) { return eval("d."+xValue); })).nice();
    // y.domain(d3.extent(data, function(d) { return eval("d."+yValue); })).nice();
	

	
	//d3.select('circle').remove();
	svg.selectAll("circle")
		.data(data)
		.enter().append("circle")
        //.attr("class", "dot")
        .attr("r", 3.5)
        // .attr("cx", x(eval("d."+xValue)))
        // .attr("cy", y(eval("d."+yValue)))
		.attr("cx", function(d){
			return d[xValue];
		})
        .attr("cy", function(d){
			return d[yValue];
		})
        .style("fill", "purple");
	
}

/**
## onXAxisChange(value)
This function is called whenever the menu for the variable to display on the
x axis changes. It is passed the variable name that has been selected, such as
"compactness". Populate this function to update the scatterplot accordingly.
**/
function onXAxisChange(value){
	curXValue = value;
	redrawGraph(value,curYValue);
}


/**
## onYAxisChange(value)
This function is called whenever the menu for the variable to display on the
y axis changes. It is passed the variable name that has been selected, such as
"Asymmetry Coefficient". Populate this function to update the scatterplot 
accordingly.
**/
function onYAxisChange(value){
	curYValue = value;
	redrawGraph(curXValue,value);
}

/**
## showDetails(string)
This function will display details in the "details" box on the page. Pass in 
a string and it will be displayed. For example, 
    showDetails("Variety: " + item.variety);
**/
function showDetails(string){
    d3.select('#details').html(string);
}
