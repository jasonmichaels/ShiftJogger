import React, { Component } from "react";
import { connect } from "react-redux";

import { DraftsInsights } from "./DraftsInsights";
import { SentInsights } from "./SentInsights";
import GlobalInsights from "./GlobalInsights";
import { Greetings } from "./Greetings";
import {
  StyledDashboard,
  DashboardParent
} from "../styled-components/dashboardStyles";

import { getLogs } from "../../reduxors/actions/logActions";

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getLogs();
  };
  render() {
    const { logs, user } = this.props;
    const unsent = logs.filter(log => !log.sent);
    const sent = logs.filter(log => log.sent);
    return (
      <DashboardParent className="dashboard">
        <div className="text-center h1 my-4">Dashboard</div>
        <StyledDashboard>
          <div className="upper-left">
            <Greetings name={user.name} />
          </div>
          <div className="upper-right">
            <DraftsInsights unsent={unsent} />
          </div>
          <div className="lower-left">
            <SentInsights sent={sent} />
          </div>
          <div className="lower-right">
            <GlobalInsights user={user} logs={logs} />
          </div>
        </StyledDashboard>
      </DashboardParent>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  const { logs } = state.log;
  return { user, logs };
};

export default connect(
  mapStateToProps,
  { getLogs }
)(Dashboard);
