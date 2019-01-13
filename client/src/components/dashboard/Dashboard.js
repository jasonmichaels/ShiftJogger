import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { DraftsInsights } from "./DraftsInsights";
import { SentInsights } from "./SentInsights";
import GlobalInsights from "./GlobalInsights";
import { Greetings } from "./Greetings";
import {
  StyledDashboard,
  DashboardParent
} from "../componentStyles/dashboardStyles";

import { getLogs } from "../../reduxors/actions/logActions";
import { isEmpty } from "../../helpers/isEmpty";

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getLogs();
  };
  render() {
    const { logs, user } = this.props;
    const unsent = !isEmpty(logs) ? logs.filter(log => !log.sent) : 0;
    const sent = !isEmpty(logs) ? logs.filter(log => log.sent) : 0;
    return (
      <DashboardParent className="dashboard">
        <div className="text-center h1 my-4">ShiftJogger</div>
        <StyledDashboard>
          <div className="upper-left">
            <Greetings name={user.name} />
          </div>
          <div className="upper-right">
            <DraftsInsights unsent={unsent} />
          </div>
          <div className="lower-right">
            <SentInsights sent={sent} />
          </div>
          <div className="lower-left">
            <GlobalInsights />
          </div>
        </StyledDashboard>
      </DashboardParent>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  logs: PropTypes.array.isRequired,
  getLogs: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { user } = state.auth;
  const { logs } = state.log;
  return { user, logs };
};

export default connect(
  mapStateToProps,
  { getLogs }
)(Dashboard);
