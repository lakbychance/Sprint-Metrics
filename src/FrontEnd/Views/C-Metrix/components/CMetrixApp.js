import React, { Component } from "react";
import Member from "./Member.js";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "../css/style.css";
import { config } from "../../../../config";
export default class CMetrixApp extends Component {
  constructor() {
    super();
    this.state = {
      sprint: "",
      totalDev: 0,
      totalTest: 0,
      dataDev: [{ name: "", days: "", capacity: "" }],
      dataTest: [{ name: "", days: "", capacity: "" }],
      displayData: { sprint: "", dataDev: [], dataTest: [], total: "" },
      displayAllData: []
    };
    this.saveDevTotal = this.saveDevTotal.bind(this);
    this.saveTestTtoal = this.saveTestTotal.bind(this);
    this.saveSprint = this.saveSprint.bind(this);
    this.saveData = this.saveData.bind(this);
    this.saveMemberData = this.saveMemberData.bind(this);
    this.addNewMember = this.addNewMember.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.displayData = this.displayData.bind(this);
  }
  addNewMember(member) {
    member === "dev"
      ? this.setState(prevState => ({
          dataDev: [...prevState.dataDev, { name: "", days: "", capacity: "" }]
        }))
      : this.setState(prevState => ({
          dataTest: [
            ...prevState.dataTest,
            { name: "", days: "", capacity: "" }
          ]
        }));
  }
  calculateTotal(member) {
    let totalValue = 0;
    console.log(this.state.dataDev);
    member === "dev"
      ? this.state.dataDev.map(member => {
          totalValue +=
            member.days.length !== 0 && member.capacity.length !== 0
              ? parseFloat(member.days) * parseFloat(member.capacity)
              : 0;
        })
      : this.state.dataTest.map(member => {
          totalValue +=
            member.days.length !== 0 && member.capacity.length !== 0
              ? parseFloat(member.days) * parseFloat(member.capacity)
              : 0;
        });
    totalValue = parseFloat(totalValue.toPrecision(3));
    member === "dev"
      ? this.saveDevTotal(totalValue)
      : this.saveTestTotal(totalValue);
  }
  saveDevTotal(totalDevEfforts) {
    this.setState({
      totalDev: totalDevEfforts
    });
  }
  saveTestTotal(totalTestEfforts) {
    this.setState({
      totalTest: totalTestEfforts
    });
  }
  saveSprint(event) {
    this.setState({
      sprint: event.target.value
    });
  }
  saveMemberData(data, member) {
    member === "dev"
      ? this.setState(
          {
            dataDev: data
          },
          () => this.calculateTotal(member)
        )
      : this.setState(
          {
            dataTest: data
          },
          () => this.calculateTotal(member)
        );
    //this.calculateTotal(member)
    //callback();
  }

  saveData() {
    const url = config.host + config.urls.save;
    let axios = require("axios");
    let sprintName = this.state.sprint;
    let regSprint = new RegExp("^Sprint[0-9]+");
    let dataFromDev = [...this.state.dataDev];
    let dataFromTest = [...this.state.dataTest];
    sprintName !== "" && regSprint.test(sprintName)
      ? axios
          .post(url, {
            sprint: sprintName,
            dataDev: dataFromDev,
            dataTest: dataFromTest,
            total: (this.state.totalDev + this.state.totalTest).toPrecision(3)
          })
          .then(response => console.log(response))
          .then(error => console.log(error))
      : alert(
          "Please enter valid sprint name (Should be in the format Sprint1,Sprint2 etc)"
        );
  }
  displayData() {
    const url = config.host + config.urls.read;
    let axios = require("axios");

    axios
      .get(url)
      .then(response =>
        this.setState({ displayAllData: response.data }, () =>
          console.log(this.state.displayAllData)
        )
      );
  }
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>C-Metrics</Navbar.Brand>
        </Navbar>
        <div>
          <div className="row">
            <input
              id="sprint"
              onChange={this.saveSprint}
              placeholder="Sprint name"
            />
          </div>
          <h5>Developers</h5>
          <Member
            id={"dev"}
            saveMemberData={this.saveMemberData}
            addNewMember={this.addNewMember}
            totalDev={this.state.totalDev}
            data={this.state.dataDev}
          />
        </div>
        <div>
          <hr />
          <h5>Quality Engineers</h5>
          <Member
            id={"test"}
            saveMemberData={this.saveMemberData}
            addNewMember={this.addNewMember}
            totalTest={this.state.totalTest}
            data={this.state.dataTest}
          />
        </div>
        <h5>
          Total Calc:{" "}
          {(this.state.totalDev + this.state.totalTest).toPrecision(3)}{" "}
        </h5>
        <Button onClick={this.saveData} className="save" variant="info">
          Save
        </Button>
      </div>
    );
  }
}
