import "./PollutionOverview.css";

import { DatePicker, Spin } from "antd";
import React, { Component } from "react";

import HorizontalChart from "../Chart/HorizontalChart";
import { currentDate } from "../utilis/general";
import moment from "moment";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

class PollutionOverview extends Component {
  constructor(props) {
    super(props);
    //state initializations
    this.state = {
      value: [currentDate(), currentDate()],
      pollutionData: {},
    };
  }

  //api call
  componentDidMount() {
    this.fetchGraphData();
  }

  //api call : pass the params based on clicked row
  fetchGraphData = () => {
    const { rowdata } = this.props;
    const { value } = this.state;

    //take country and city from props
    let params = {};
    params.country = rowdata.country;
    params.city = rowdata.city;

    //if both values are same pass the param date_to else pass both date_to and date_from
    if (value[0] === value[1]) {
      if (value[0]) params.date_to = value[0];
    } else {
      params.date_to = value[0];
      params.date_from = value[1];
    }

    //initally make the progress bar visible
    if (document.getElementById("progressGraph") !== null)
    document.getElementById("progressGraph").style.display = "table";

    //api call , after getting the response hide the progress bar
    let promise = new Promise(function (resolve, reject) {
      fetch(
        "https://api.openaq.org/v1/measurements?" + new URLSearchParams(params)
      ).then((response) => resolve(response.json()));
    });

    promise.then(
      (response) => {
        this.setState({ pollutionData: this.getData(response.results) });
        if (document.getElementById("progressGraph") !== null)
          document.getElementById("progressGraph").style.display = "none";
      },
      (error) => {
        alert(error);
        if (document.getElementById("progressGraph") !== null)
          document.getElementById("progressGraph").style.display = "none";
      }
    );
  };

 // method for passing data to bar chart
  getData = (response) => {
    let labels = [];
    let data = [];
    
    //labels and data are used for plotting the graph
    if (response && response.length > 0) {
      response.map((item) => {
        labels.push(item.parameter);
        data.push(item.value);
      });
    }

    //chardata is the expected format for chart js 2 horizontal chart
    let chartData = {
      labels: labels,
      datasets: [
        {
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: data,
        },
      ],
    };
    return chartData;
  };

  //whenever date is changed or closed, it enters this method
  //when date is changed also need to update the graph
  onChange = (date, dateString) => {
    this.setState({ value: dateString }, () => {
      this.fetchGraphData();
    });
  };

  render() {
    const { value, pollutionData } = this.state;

    return (
      <>
        <div className="spinOuterContainer"
        >
          <div id="progressGraph" className="spinInnerContainer">
            <Spin className="spinElement"
              size="large"
            />
          </div>
        </div>
        <div className="rangePickerContainer">
          <RangePicker
            className="rangePicker"
            defaultValue={[
              moment(value[0], dateFormat),
              moment(value[1], dateFormat),
            ]}
            format={dateFormat}
            onChange={this.onChange}
          />
        </div>
        <HorizontalChart data={pollutionData} />
      </>
    );
  }
}

export default PollutionOverview;
