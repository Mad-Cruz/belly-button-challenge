// URL
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Use D3 to fetch the JSON file
d3.json(url).then(function(data) {
  console.log(data);

    // Populate the dropdown menu with sample names
  dropdownData(data);

    // Initialize the page with charts and metadata for the first sample
  barChart(data, data.names[0]);
  bubbleChart(data, data.names[0]);
  metaData(data, data.names[0]);

  d3.selectAll("#selDataset").on("change", function() {
    let testSubject = d3.select(this).property("value");
    barChart(data, testSubject); 
    bubbleChart(data, testSubject); 
    metaData(data, testSubject); 
});

});

// Function to populate the dropdown menu with sample names
function dropdownData(info){
  let dropdownMenu = d3.select("#selDataset");
  let names = info.names;
  dropdownMenu.html(""); // clears out dropdown selection

    // Add options to the dropdown menu for each sample name
  for (i = 0; i < names.length; i++){
    dropdownMenu.append("option").text(names[i]).attr("value", names[i]);
  }; 
};


function barChart(info, id){
    // Find the sample in the data that matches the provided id
  let samples = info.samples.find(sample => sample.id === id); 

    // Define the trace for the bar chart
  let trace = {
    // X-axis values (top 10 sample values, reversed for horizontal chart)
    x: samples.sample_values.slice(0,10).reverse(),
     // Y-axis values (top 10 OTU IDs formatted as "OTU {id}", reversed for horizontal chart)
    y: samples.otu_ids.slice(0,10).reverse().map(id => `OTU ${id}`),
    // Text labels for each bar (top 10 OTU labels, reversed
    text: samples.otu_labels.slice(0, 10).reverse(),
    type: "bar",
    orientation: "h"
 };

 let plotData = [trace];
 Plotly.newPlot('bar', plotData);

};


function bubbleChart(info, id){

let samples = info.samples.find(sample => sample.id === id); 


let trace = {
  x: samples.otu_ids,
  y: samples.sample_values,
  text: samples.otu_labels,
  mode: "markers",
  marker: {
  size: samples.sample_values,
   color: samples.otu_ids,
   colorscale: 'Sky'
  }

};   
let layout = {
    xaxis: { title: 'OTU ID' }
};

let plotData = [trace];
Plotly.newPlot('bubble', plotData, layout);

};


function metaData(info, id){
  let samples = info.metadata.find(sample => `${sample.id}` === id);
  let demographicInfo = d3.select("#sample-metadata");
  demographicInfo.html("");

 
  Object.entries(samples).forEach(([key, value]) => {
    demographicInfo.append("p").text(`${key}: ${value}`);
  });
}