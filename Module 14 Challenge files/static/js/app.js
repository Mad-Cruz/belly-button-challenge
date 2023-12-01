// URL
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Use D3 to fetch the JSON file
d3.json(url).then(function(data) {
  console.log(data);

  dropdownData(data);

});

function dropdownData(info){
  let dropdownMenu = d3.select("#selDataset");
  let names = info.names;
  dropdownMenu.html(""); // clears out dropdown selection

  for (i = 0; i < names.length; i++){
    dropdownMenu.append("option").text(names[i]).attr("value", names[i]);
  }; 
};




