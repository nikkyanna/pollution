import "./HorizontalChart.css";

import { Card } from "antd";
import { HorizontalBar } from "react-chartjs-2";
import React from "react";

const HorizontalChart = (props) => {
  const { data } = props;

  //legend - to hide the data sets,
  //scales - to avoid the grid lines in the graph
  //options - foramtting the graph as needed to display
  var options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  };

  //to set the height of the graph chart
  let chartHeight = 3000;
  if (data && data.labels) {
    let numOfBars = data.labels.length;
    chartHeight = numOfBars > 10 ? (300 * numOfBars) / 10 : 300;
  }
  return (
    <Card>
      <h2 className="chartContainerHeader">Pollution Overview</h2>
      <div className="chartContainer">
        {Object.keys(data).length > 0 && Object.keys(data.labels).length > 0 ? (
          <div style={{ height: chartHeight }}>
            <HorizontalBar data={data} options={options} />
          </div>
        ) : (
          <div className="noData">NO DATA</div>
        )}
      </div>
    </Card>
  );
};

export default HorizontalChart;
