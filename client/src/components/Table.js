import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getLogs,
  getLog,
  deleteLog,
  prepSend,
  searchLogs
} from "../reduxors/actions/logActions";
import { withRouter } from "react-router-dom";

import { TableContent } from "../components/common/TableContent";
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

  handleViewPDF = cloudinary => {
    window.open(cloudinary.url, "_blank");
  };
  render() {
    const { type, logs, activeId } = this.props;
    const { query } = this.state;
    return (
      <div className="logs" style={{ marginTop: "1rem" }}>
        {type === "drafts" ? (
          <TableContent
            logs={!isEmpty(logs) ? logs.filter(log => !log.sent) : null}
            activeId={activeId}
            query={query}
            handleQuery={this.handleQuery}
            handleEdit={this.handleEdit}
            type={type}
            handleDelete={this.handleDelete}
            handleSend={this.handleSend}
          />
        ) : (
          <TableContent
            logs={!isEmpty(logs) ? logs.filter(log => log.sent) : null}
            activeId={activeId}
            query={query}
            handleQuery={this.handleQuery}
            type={type}
            handleViewPDF={this.handleViewPDF}
          />
        )}
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
