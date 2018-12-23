import React, { Component } from "react";
import { HeaderTextStyle } from "./styled-components/headerStyles";
import { connect } from "react-redux";
import {
  getLogs,
  getLog,
  deleteLog,
  prepSend,
  searchLogs
} from "../reduxors/actions/logActions";
import { withRouter } from "react-router-dom";
import { StyledCardRoot } from "./styled-components/tableStyles";

import CardComponent from "./CardComponent";
import { isEmpty } from "../helpers/isEmpty";

class Table extends Component {
  state = {
    query: ""
  };

  componentWillMount = () => {
    this.props.getLogs();
  };

  handleQuery = query => {
    this.setState({ query: query });
    if (query) {
      this.props.searchLogs(query);
    } else {
      this.props.getLogs();
    }
  };

  handleEdit = id => {
    this.props.getLog(id, this.props.history);
  };

  handleDelete = id => {
    this.props.deleteLog(id);
  };

  handleSend = id => {
    this.props.prepSend(id, this.props.history);
  };

  render() {
    const { type, logs, activeId } = this.props;
    const { query } = this.state;
    return (
      <div className="logs" style={{ marginTop: "1rem" }}>
        <HeaderTextStyle>
          {type === "drafts" ? "Drafts" : "Sent"}
        </HeaderTextStyle>
        <div
          style={{
            margin: "0 auto",
            width: "90%",
            maxWidth: "calc(1000px - (1rem * 2))"
          }}>
          <input
            className="form-control"
            type="text"
            value={query}
            onChange={e => this.handleQuery(e.target.value)}
            placeholder={
              logs !== undefined ? "Search logs by title" : "Nothing to search!"
            }
          />
        </div>
        <StyledCardRoot>
          {logs.length > 0 ? (
            logs.map(log => {
              return (
                log.displayed && (
                  <CardComponent
                    key={log._id}
                    log={log}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                    activeId={activeId}
                  />
                )
              );
            })
          ) : (
            <span>No logs to search!</span>
          )}
        </StyledCardRoot>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { logs, activeId } = state.log;
  const { auth } = state;
  return { logs, auth, activeId };
};

export default connect(
  mapStateToProps,
  { getLogs, getLog, deleteLog, prepSend, searchLogs }
)(withRouter(Table));
