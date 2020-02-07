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

/* Donut */
  let dataset = [funnelSalesData[0].value, 250000, funnelSalesData[1].value, 250000, funnelSalesData[2].value, 250000, funnelSalesData[3].value, 250000];

  let width = 320;

  let color = ["#61D267", "transparent", "#FA3264", "transparent", "#627884", "transparent", "#E2E9E9", "transparent"];

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

/* Графики в легенде */
  let summary = funnelSalesData[0].value + funnelSalesData[1].value + funnelSalesData[2].value + funnelSalesData[3].value,
  widthRedeemed = funnelSalesData[0].value / summary * 100,
  widthRevoked = funnelSalesData[1].value / summary * 100,
  widthReturned = funnelSalesData[2].value / summary * 100,
  widthProcessing = funnelSalesData[3].value / summary * 100;

document.querySelector(".ppa-widget-sales-funnel__legend-chart--redeemed").style.width = widthRedeemed + "%";
document.querySelector(".ppa-widget-sales-funnel__legend-chart--revoked").style.width = widthRevoked + "%";
document.querySelector(".ppa-widget-sales-funnel__legend-chart--returned").style.width = widthReturned + "%";
document.querySelector(".ppa-widget-sales-funnel__legend-chart--processing").style.width = widthProcessing + "%";

/* Открытие и закрытие меню */
let salesFunnelMenuBurger = document.querySelector('.ppa-widget-sales-funnel__menu');

// Закрытие попапа меню по клику мимо него
document.querySelector('body').addEventListener('click', function() {
  document.querySelector('.ppa-widget-sales-funnel__menu-popup').classList.remove('visible-flex');
});

salesFunnelMenuBurger.addEventListener('click', function(e) {
  e.stopPropagation();
  document.querySelector('.ppa-widget-sales-funnel__menu-popup').classList.toggle('visible-flex');
});

/* Тултипсы */

let donutSegment1 = document.querySelector('#graphic-sales-funnel > svg > g path:nth-child(1)'),
  donutSegment2 = document.querySelector('#graphic-sales-funnel > svg > g path:nth-child(3)'),
  donutSegment3 = document.querySelector('#graphic-sales-funnel > svg > g path:nth-child(5)'),
  donutSegment4 = document.querySelector('#graphic-sales-funnel > svg > g path:nth-child(7)');

let segment1Tooltip = document.querySelector('.segment1Tooltip'),
  segment2Tooltip = document.querySelector('.segment2Tooltip'),
  segment3Tooltip = document.querySelector('.segment3Tooltip'),
  segment4Tooltip = document.querySelector('.segment4Tooltip');

// Первый тултипс
donutSegment1.addEventListener('mouseover', function (e) {
  segment1Tooltip.style.display = 'block';
  segment1Tooltip.style.top = e.pageY - 62 + 'px';
  segment1Tooltip.style.left = e.pageX - 70 + 'px';
  donutSegment2.style.transition = 'opacity 0.5s ease';
  donutSegment2.style.opacity = '0.2';
  donutSegment3.style.transition = 'opacity 0.5s ease';
  donutSegment3.style.opacity = '0.2';
  donutSegment4.style.transition = 'opacity 0.5s ease';
  donutSegment4.style.opacity = '0.2';
});

donutSegment1.addEventListener('mousemove', function (e) {
  segment1Tooltip.style.top = e.pageY - 62 + 'px';
  segment1Tooltip.style.left = e.pageX - 70 + 'px';
});

donutSegment1.addEventListener('mouseout', function (e) {
  segment1Tooltip.style.display = 'none';
  donutSegment2.style.opacity = '1';
  donutSegment3.style.opacity = '1';
  donutSegment4.style.opacity = '1';
});

// Второй тултипс
donutSegment2.addEventListener('mouseover', function (e) {
  segment2Tooltip.style.display = 'block';
  segment2Tooltip.style.top = e.pageY - 62 + 'px';
  segment2Tooltip.style.left = e.pageX - 70 + 'px';
  donutSegment3.style.transition = 'opacity 0.5s ease';
  donutSegment3.style.opacity = '0.2';
  donutSegment4.style.transition = 'opacity 0.5s ease';
  donutSegment4.style.opacity = '0.2';
  donutSegment1.style.transition = 'opacity 0.5s ease';
  donutSegment1.style.opacity = '0.2';
});

donutSegment2.addEventListener('mousemove', function (e) {
  segment2Tooltip.style.top = e.pageY - 62 + 'px';
  segment2Tooltip.style.left = e.pageX - 70 + 'px';
});

donutSegment2.addEventListener('mouseout', function (e) {
  segment2Tooltip.style.display = 'none';
  donutSegment3.style.opacity = '1';
  donutSegment4.style.opacity = '1';
  donutSegment1.style.opacity = '1';
});

// Третий тултипс
donutSegment3.addEventListener('mouseover', function (e) {
  segment3Tooltip.style.display = 'block';
  segment3Tooltip.style.top = e.pageY - 62 + 'px';
  segment3Tooltip.style.left = e.pageX - 70 + 'px';
  donutSegment4.style.transition = 'opacity 0.5s ease';
  donutSegment4.style.opacity = '0.2';
  donutSegment1.style.transition = 'opacity 0.5s ease';
  donutSegment1.style.opacity = '0.2';
  donutSegment2.style.transition = 'opacity 0.5s ease';
  donutSegment2.style.opacity = '0.2';
});

donutSegment3.addEventListener('mousemove', function (e) {
  segment3Tooltip.style.top = e.pageY - 62 + 'px';
  segment3Tooltip.style.left = e.pageX - 70 + 'px';
});

donutSegment3.addEventListener('mouseout', function (e) {
  segment3Tooltip.style.display = 'none';
  donutSegment4.style.opacity = '1';
  donutSegment1.style.opacity = '1';
  donutSegment2.style.opacity = '1';
});

// Четвертый тултипс
donutSegment4.addEventListener('mouseover', function (e) {
  segment4Tooltip.style.display = 'block';
  segment4Tooltip.style.top = e.pageY - 62 + 'px';
  segment4Tooltip.style.left = e.pageX - 70 + 'px';
  donutSegment1.style.transition = 'opacity 0.5s ease';
  donutSegment1.style.opacity = '0.2';
  donutSegment2.style.transition = 'opacity 0.5s ease';
  donutSegment2.style.opacity = '0.2';
  donutSegment3.style.transition = 'opacity 0.5s ease';
  donutSegment3.style.opacity = '0.2';
});

donutSegment4.addEventListener('mousemove', function (e) {
  segment4Tooltip.style.top = e.pageY - 62 + 'px';
  segment4Tooltip.style.left = e.pageX - 70 + 'px';
});

donutSegment4.addEventListener('mouseout', function (e) {
  segment4Tooltip.style.display = 'none';
  donutSegment1.style.opacity = '1';
  donutSegment2.style.opacity = '1';
  donutSegment3.style.opacity = '1';
});