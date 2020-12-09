import "./PanelComponent.css";

import {Modal, Spin, Table} from "antd";
import React, { Component } from "react";

import PollutionOverview from "../PollutionOverview/PollutionOverview";
import { splitNumberWithCommas } from "../utilis/general";

class StatesContainer extends Component {
  constructor(props) {
    super(props);
    //state initializations
    this.state = {
      cityList: [],
      isRowClicked: false,
      singleRowData: {},
    };
  }

  //getData - method for api call
  componentDidMount() {
    this.getData();
  }

  //get data: api call to display cities in india, passing the query param as country : india,
  //also hide progress bar after getting the response
  getData = () => {
    let promise = new Promise(function (resolve, reject) {
      fetch("https://api.openaq.org/v1/cities?country=IN").then((response) =>
        resolve(response.json())
      );
    });

    promise.then(
      (response) => {
        this.setState({ cityList: response.results });
        if (document.getElementById("progress") !== null)
          document.getElementById("progress").style.display = "none";
      },
      (error) => {
        alert(error);
        if (document.getElementById("progress") !== null)
          document.getElementById("progress").style.display = "none";
      }
    );
  };

  //when each row is clicked, corresponding record of the row is saved in state
  handleTableRowClick = (record) => {
    this.setState({ isRowClicked: true, singleRowData: record });
  };

  //when the close button of modal is clicked
  setModalVisibility = (modalVisible) => {
    this.setState({
      isRowClicked: modalVisible,
    });
  };

  render() {
    const { cityList, singleRowData,isRowClicked } = this.state;
    let modal;

    //columns for displaying in table, splitNumberWithCommas - use to split numbers
    const columns = [
      {
        title: "City",
        dataIndex: "city",
        key: "city",
      },
      {
        title: "Count",
        dataIndex: "count",
        key: "count",
        render: (val) => {
          return <div>{splitNumberWithCommas(val)}</div>;
        },
      },
      {
        title: "Locations",
        dataIndex: "locations",
        key: "locations",
      },
    ];

    //if row is clicked, display modal inside that load the datepicker and graph
    if (isRowClicked) {
      modal = (
        <Modal
          title="DAILY POLLUTION ANALYSIS"
          visible={this.state.isRowClicked}
          onCancel={this.setModalVisibility.bind(this, false)}
          footer={null}
        >
          <PollutionOverview rowdata={singleRowData} />
        </Modal>
      );
    }

    return (
      <>
        <div className="spinContainer">
          <div id="progress">
            <Spin className="spinElement" size="large"/>
          </div>
        </div>

        <div className="container">
          <Table
            columns={columns}
            dataSource={cityList}
            onRow={(record) => ({
              onClick: () => {
                this.handleTableRowClick(record);
              },
            })}
            scroll={{ x: "max-content", y: 380 }}
          ></Table>
          {modal}
        </div>
      </>
    );
  }
}

export default StatesContainer;
