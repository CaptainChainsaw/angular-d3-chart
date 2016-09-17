# angular-d3-chart

This directive displays a d3 bar chart, this chart shows results of job application per month.  This could be easily changed to sales per month if need be.  The chart will show a loading message which can be passed into the directive as shown below.  Also it will take an external JSON source to populate the chart with, for example:

```sh
[
	{"key" : "Jan", "value" : "50"},
	{"key" : "Feb", "value" : "100"}
]
```

The names "key" and "value" must be in your JSON source.

The x-axis displays an ordinal scale and the y-axis shows a linear scale.  

Here's an example to demonstrate how this chart works:  http://plnkr.co/edit/AC2FD1biq8td7pIuL3Fs?p=preview


In order to use this directive you will need the following:

 - angular.js (tested on version 1.3.15)
 - d3.js (version 3, included in this repo as d3.min.js)
 - ng-chart.js
 - ng-d3.js
 - style.css
 
 # Useage

Include the directive, set the loading message and the url of your JSON source.

```sh
<applications-chart loading-message="Loading Chart" url="/php/salesChart.php"></applications-chart>
```

# To do
 - Make the chart responsive
 - Pass colour attributes to the directive
