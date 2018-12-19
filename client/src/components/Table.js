import React, { Component } from "react";
import { HeaderTextStyle } from "./HeaderStyles";
import { connect } from "react-redux";
import { getLogs, editLog, deleteLog } from "../reduxors/actions/logActions";
import Moment from "react-moment";
import { withRouter } from "react-router-dom";
import { LoadAndDelete } from "./common/LoadAndDelete";

class Grid extends Component {
  state = {
    query: "",
    logs: [],
    deleting: false,
    activeId: null
  };
  componentDidMount = () => {
    this.props.dispatch(getLogs());
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      errors: nextProps.errors,
      logs: nextProps.logs.filter(log =>
        this.props.type === "sent" ? !log.sent : log
      ),
      deleting: false
    });
  };

  handleQuery = query => {
    const logs = [...this.props.logs];

    this.setState({ query });

    if (query !== "") {
      const newLogs = logs.filter(log =>
        log.title.toLowerCase().includes(query.toLowerCase())
      );
      this.setState({
        logs: newLogs
      });
    } else {
      this.setState({ logs: this.props.logs });
    }
  };

  handleEdit = id => {
    this.props.dispatch(editLog(id, this.props.history));
  };
  handleDelete = id => {
    this.setState({ deleting: true, activeId: id });
    this.props.dispatch(deleteLog(id));
  };
  render() {
    const { type } = this.props;
    const { query, logs } = this.state;
    return (
      <div className="logs" style={{ marginTop: "1rem" }}>
        <HeaderTextStyle>
          {type === "draft" ? "Drafts" : "Sent"}
        </HeaderTextStyle>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            value={query}
            onChange={e => this.handleQuery(e.target.value)}
            placeholder={logs.length > 0 ? "Search logs" : "Nothing to search!"}
          />
        </div>

        <table className="table">
          <tbody>
            <tr>
              {[
                "Title",
                "Date",
                "Shift Start",
                "Shift End",
                "Comments",
                "Edit",
                "Delete"
              ].map(heading => (
                <th key={heading} scope="col" className="text-center">
                  {heading}
                </th>
              ))}
              <th scope="col" className="text-center">
                {type === "sent" ? "Sent" : "Send"}
              </th>
            </tr>
            {logs &&
              logs.map(log =>
                log.sent === false && type === "draft" ? (
                  <tr key={log._id}>
                    <td>{log.title}</td>
                    <td>
                      <Moment format="MM/DD/YYYY">{log.date}</Moment>
                    </td>
                    <td>{log.shiftStart}</td>
                    <td>{log.shiftEnd}</td>
                    <td>{log.comments}</td>
                    <td style={{ cursor: "pointer" }}>
                      <span
                        onClick={() => this.handleEdit(log._id)}
                        role="img"
                        aria-label="pencil">
                        ✏️
                      </span>
                    </td>
                    <td style={{ cursor: "pointer" }}>
                      {this.state.activeId !== log._id ? (
                        <span onClick={() => this.handleDelete(log._id)}>
                          X
                        </span>
                      ) : (
                        this.state.activeId === log._id && (
                          <span>
                            <LoadAndDelete />
                          </span>
                        )
                      )}
                    </td>
                    <td style={{ cursor: "pointer" }}>
                      <span onClick={() => this.handleSend(log._id)}>
                        Send Now
                      </span>
                    </td>
                  </tr>
                ) : (
                  log.sent &&
                  type === "sent" && (
                    <tr key={log._id}>
                      <td>{log.title}</td>
                      <td>
                        <Moment format="MM/DD/YYYY">{log.date}</Moment>
                      </td>
                      <td>{log.shiftStart}</td>
                      <td>{log.shiftEnd}</td>
                      <td>{log.comments}</td>
                      <td style={{ cursor: "pointer" }}>
                        <span
                          onClick={() => this.handleEdit(log._id)}
                          role="img"
                          aria-label="pencil">
                          ✏️
                        </span>
                      </td>
                      <td style={{ cursor: "pointer" }}>
                        {this.state.activeId !== log._id ? (
                          <span onClick={() => this.handleDelete(log._id)}>
                            X
                          </span>
                        ) : (
                          this.state.activeId === log._id && <LoadAndDelete />
                        )}
                      </td>
                      <td>Date Sent...</td>
                    </tr>
                  )
                )
              )}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { logs } = state.log;
  const { auth, deleting } = state;
  return { logs, auth, deleting };
};

export default connect(mapStateToProps)(withRouter(Grid));
