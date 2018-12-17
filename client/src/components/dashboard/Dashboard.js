import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { DraftsInsights } from "./DraftsInsights";
import { SentInsights } from "./SentInsights";
import { GlobalInsights } from "./GlobalInsights";
import { Greetings } from "./Greetings";

import { getLogs } from "../../reduxors/actions/logActions";

import styled from "styled-components";

const StyledDashboard = styled.div`
  max-width: 1000px;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "upper-left upper-right"
    "lower-left lower-right";
  margin: 0 auto;
  padding: 0;
  & * {
    text-align: center;
  }
  & .upper-left {
    width: 100%;
    height: 100%;
    grid-area: upper-left;
    display: grid;
    justify-content: center;
    align-content: center;
    padding: 2rem;
    font-size: 2rem;
  }
  & .upper-right {
    width: 100%;
    height: 100%;
    grid-area: upper-right;
    display: grid;
    justify-content: center;
    align-content: center;
  }
  & .lower-left {
    width: 100%;
    height: 100%;
    grid-area: lower-left;
    display: grid;
    justify-content: center;
    align-content: center;
  }
  & .lower-right {
    width: 100%;
    height: 100%;
    grid-area: lower-right;
    display: grid;
    justify-content: center;
    align-content: center;
  }
`;

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getLogs();
  };
  render() {
    const { logs } = this.props;
    const unsent = logs.filter(log => log.sent === false);
    const sent = logs.filter(log => log.sent);
    const { user } = this.props.auth;
    return (
      <div
        className="dashboard"
        style={{
          width: "100%",
          height: "calc(100% - 150px)"
        }}>
        <div className="text-center h1 my-4">Dashboard</div>
        <StyledDashboard>
          <div className="upper-left">
            <Greetings name={user.name} />
          </div>
          <div className="upper-right">
            <DraftsInsights unsent={unsent} />
          </div>
          <div className="lower-left">
            <GlobalInsights user={user} logs={logs} />
          </div>
          <div className="lower-right">
            <SentInsights sent={sent} />
          </div>
        </StyledDashboard>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
  logs: state.log.logs
});

export default connect(
  mapStateToProps,
  { getLogs }
)(Dashboard);
