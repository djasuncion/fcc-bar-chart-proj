d3.select("#viz")
  .append("h1")
  .text("Bar Chart")
  .style("text-align", "center");

const width = 1000,
  height = 500,
  barWidth = width / 275;

const svg = d3
  .select("#viz")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("background-color", "red");

d3.json(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then(data => {
    console.log(data);
    const MIN = d3.min(data.data, d => d[1]);
    console.log(`MIN: ${MIN}`);
    const MAX = d3.max(data.data, d => d[1]);
    console.log(`MAX: ${MAX}`);
    console.log(data.data.length);

    const years = data.data.map(d => new Date(d[0]));
    console.log(years);

    const MAX_DATE = d3.max(years);
    console.log(MAX_DATE);

    const MIN_DATE = d3.min(years);
    console.log(MIN_DATE);

    console.log(MAX_DATE.getMonth());

    const xScale = d3
      .scaleTime()
      .domain([MIN_DATE])
      .range();
  })
  .catch(error => console.log(error));
