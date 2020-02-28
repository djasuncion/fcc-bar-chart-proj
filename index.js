d3.select("#viz")
  .append("h1")
  .text("Bar Chart")
  .style("text-align", "center")
  .attr("id", "title");

const width = 800,
  height = 400,
  barWidth = width / 275;

const tooltip = d3
  .select("#viz")
  .append("div")
  .attr("id", "tooltip")
  .style("opacity", "0");

const svg = d3
  .select("#viz")
  .append("svg")
  .attr("width", width + 100)
  .attr("height", height + 60);

d3.json(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then(data => {
    console.log(data);
    //X-SCALE
    const DATES = data.data.map(d => new Date(d[0]));
    console.log(DATES);

    const MAX_DATE = d3.max(DATES);
    MAX_DATE.setMonth(MAX_DATE.getMonth() + 3);
    console.log(MAX_DATE);

    const MIN_DATE = d3.min(DATES);
    console.log(MIN_DATE);

    const xScale = d3
      .scaleTime()
      .domain([MIN_DATE, MAX_DATE])
      .range([0, width]);

    const xAxis = d3.axisBottom().scale(xScale);

    const axisBottomG = svg
      .append("g")
      .call(xAxis)
      .attr("id", "x-axis")
      .attr("transform", "translate(60, 410)");

    //Y-SCALE
    const VALUES = data.data.map(d => d[1]);
    const MIN_VALUE = d3.min(VALUES, d => d);
    console.log(`MIN: ${MIN_VALUE}`);
    const MAX_VALUE = d3.max(VALUES, d => d);
    console.log(`MAX: ${MAX_VALUE}`);
    console.log(data.data.length);

    const yScale = d3
      .scaleLinear()
      .domain([0, MAX_VALUE])
      .range([height, 0]);

    const yAxis = d3.axisLeft().scale(yScale);

    const axisLeftG = svg
      .append("g")
      .call(yAxis)
      .attr("id", "y-axis")
      .attr("transform", "translate(60, 10)");

    const xLinearScale = d3
      .scaleLinear()
      .domain([0, MAX_VALUE])
      .range([0, height]);

    const scaledValues = VALUES.map(v => xLinearScale(v));
    console.log(scaledValues);

    svg
      .selectAll("rect")
      .data(scaledValues)
      .enter()
      .append("rect")
      .attr("data-date", (d, i) => data.data[i][0])
      .attr("data-gdp", (d, i) => data.data[i][1])
      .attr("class", "bar")
      .attr("x", (d, i) => xScale(DATES[i]))
      .attr("y", (d, i) => height - d)
      .attr("width", barWidth)
      .attr("height", d => d)
      .attr("fill", "red")
      .attr("transform", "translate(60, 10)")
      .on("mouseover", (d, i) => {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip
          .html(
            `${DATES[i].toLocaleDateString()} </br> $${VALUES[i].toFixed(
              1
            )} Billion`
          )
          .attr("data-date", data.data[i][0])
          .style("left", i * barWidth + 30 + "px")
          .style("top", height - 100 + "px")
          .style("transform", "translateX(60px)");
      })
      .on("mouseout", (d, i) => {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0);
      });
  })
  .catch(error => console.log(error));
