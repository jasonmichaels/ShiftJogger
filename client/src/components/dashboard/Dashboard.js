import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//thirt party imports
import { 
  Container,
  Row, 
  Col 
  } from "reactstrap";

import { DraftsInsights } from "./DraftsInsights";
import { SentInsights } from "./SentInsights";
import GlobalInsights from "./GlobalInsights";
import { Greetings } from "./Greetings";
import {
  StyledDashboard,
  DashboardParent,
  DashboardBanner,
  SnapShotStyle
} from "../componentStyles/dashboardStyles";

import { DashboardBannerSummary } from "./DashboardBannerSummary";
import { LogSnapshot } from "./LogSnapshot";

import { getLogs } from "../../reduxors/actions/logActions";
import { isEmpty } from "../../helpers/isEmpty";

const dashStyle = {
  textAlign: 'left',
};

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getLogs();
  };
  render() {
    const { logs, user } = this.props;
    const unsent = !isEmpty(logs) ? logs.filter(log => !log.sent) : 0;
    const sent = !isEmpty(logs) ? logs.filter(log => log.sent) : 0;
    return (
      <div>

        <div style={dashStyle}>
            <DashboardBanner >
                <Container>
                    <Row>
                        <Col xs="12" sm="4">
                            <DashboardBannerSummary />
                        </Col>
                        <Col xs="12" sm="4">
                            <DashboardBannerSummary />
                        </Col>
                        <Col xs="12" sm="4">
                            <DashboardBannerSummary />         
                        </Col>
                    </Row>
                </Container>
            </DashboardBanner>
                
            <Container style={SnapShotStyle}>
                <h3>Recent Invoices</h3>
                <Row>
                    <Col >
                        <LogSnapshot />
                    </Col>
                    <Col>
                        <LogSnapshot />
                    </Col>             
                    <Col>
                        <LogSnapshot />
                    </Col>
                </Row>
            </Container>
        </div>

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
      </div>
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
