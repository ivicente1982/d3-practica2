const width = 800
const height = 600
const margin = {
    top: 10, 
    bottom: 40, 
    right: 10, 
    left: 40
}

const svg = d3.select("div#chart").append("svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g").attr("class", "elementGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)
const axisGroup = svg.append("g").attr("class", "axisGroup")
const xAxisGroup = axisGroup.append("g").attr("class", "xAxisGroup").attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axisGroup.append("g").attr("class", "yAxisGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)

const x = d3.scaleBand().range([17, width - margin.left - margin.right]).padding(0.1)
const y = d3.scaleLinear().range([height - margin.bottom - margin.top, 0])  // ojo! eje al revés

const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)


d3.csv("data.csv").then(data => {
    data.map(d => {
        d.age = +d.age
    })

    x.domain(data.map(d => d.year))
    y.domain([17, d3.max(data.map(d => d.age))])
  

    yAxis.ticks(d3.max(data.map(d => d.age)))

    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)

    // data binding:
    const bars = elementGroup.selectAll("rect").data(data)
    bars.enter()
        .append("rect")
        .attr("x", d => x(d.year))
        .attr("y", d=> y(d.age))
        .attr("width", x.bandwidth())
        .attr("height", d => height - margin.top - margin.bottom - y(d.age))
 

    console.log(data)
})
