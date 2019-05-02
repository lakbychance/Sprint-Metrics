import React, { Component } from "react";
import { Link } from "react-router-dom";
import PlotApp from "./PlotApp.js";
import { Navbar } from "react-bootstrap";
import "../css/style.css";

export default class DashBoardApp extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Dashboard</Navbar.Brand>
          <Navbar.Text>Sprint-Metrics</Navbar.Text>
        </Navbar>
        <div className="Dashboard">
          <div className="AppView">
            <div className="VMetrixApp">
              <div className="Label">
                <Link to="/c-metrix" style={{ textDecoration: "none" }}>
                  C-Metrix
                </Link>
              </div>
            </div>
            <div className="BTrackerApp">
              <div className="Label">B-Tracker</div>
            </div>
          </div>
          <div className="PlotView">
            <div className="Plot">
              <PlotApp />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
