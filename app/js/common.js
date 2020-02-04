let funnelSalesData = [
  {
    create_dt: "2019-07-02T00:00:00+03:00",
    param_id: 116,
    partner_id: 2224,
    value: 17200000
  },
  {
    create_dt: "2019-07-02T00:00:00+03:00",
    param_id: 117,
    partner_id: 2224,
    value: 3200000
  },
  {
    create_dt: "2019-07-02T00:00:00+03:00",
    param_id: 118,
    partner_id: 2224,
    value: 300000
  },
  {
    create_dt: "2019-07-02T00:00:00+03:00",
    param_id: 119,
    partner_id: 2224,
    value: 1200000
  }
];

  let dataset = [funnelSalesData[0].value, 250000, funnelSalesData[1].value, 250000, funnelSalesData[2].value, 250000, funnelSalesData[3].value, 250000];

  let width = 320;

  let color = ["#61D267", "transparent", "#E2E9E9", "transparent", "#627884", "transparent", "#FA3264", "transparent"];

  let pie = d3.pie()
    .sort(null);

  let arc = d3.arc()
      .innerRadius(width / 2 - 3)
      .outerRadius(width / 2 - 30);

  let svg = d3.select("#graphic-sales-funnel")
      .append("svg")
      .attr("width", width)
      .attr("height", width)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + width / 2 + ")");

  let path = svg.selectAll("path")
    .data(pie(dataset))
    .enter().append("path")
    .attr("fill", function(d, i) { return color[i]; })
    .attr("d", arc)
    .attr("stroke", function(d, i) { return color[i]; })
    .attr("stroke-width", 5)
    .attr("stroke-linecap", "square")
    .attr("stroke-linejoin", "round");

  let summary = funnelSalesData[0].value + funnelSalesData[1].value + funnelSalesData[2].value + funnelSalesData[3].value,
  widthRedeemed = funnelSalesData[0].value / summary * 100,
  widthRevoked = funnelSalesData[1].value / summary * 100,
  widthReturned = funnelSalesData[2].value / summary * 100,
  widthProcessing = funnelSalesData[3].value / summary * 100;

document.querySelector(".ppa-widget-sales-funnel__legend-chart--redeemed").style.width = widthRedeemed + "%";
document.querySelector(".ppa-widget-sales-funnel__legend-chart--revoked").style.width = widthRevoked + "%";
document.querySelector(".ppa-widget-sales-funnel__legend-chart--returned").style.width = widthReturned + "%";
document.querySelector(".ppa-widget-sales-funnel__legend-chart--processing").style.width = widthProcessing + "%";
