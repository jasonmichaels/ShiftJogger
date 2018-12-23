import React, { Component } from "react";
import { HeaderTextStyle } from "./styled-components/headerStyles";
import { connect } from "react-redux";
import {
  getLogs,
  getLog,
  deleteLog,
  prepSend
} from "../reduxors/actions/logActions";
import Moment from "react-moment";
import { withRouter } from "react-router-dom";
import { LoadAndDelete } from "./common/LoadAndDelete";

import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { CardComponent } from "./CardComponent";
import { isEmpty } from "../helpers/isEmpty";

const styles = theme => ({
  root: {
    display: "flex",
    margin: "1rem",
    flexWrap: "wrap",
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    maxWidth: "1000px",
    margin: "0 auto",
    "&::before": {
      content: ""
    },
    "&::after": {
      content: ""
    }
  },
  title: {
    fontSize: 12
  },
  card: {
    display: "grid",
    gridTemplateRows: "1fr auto",
    gridGap: "8px",
    width: 300,
    minHeight: 280,
    margin: "1rem"
  },
  pos: {
    marginTop: "1rem"
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  }
});

class Table extends Component {
  state = {
    query: "",
    logs: [],
    deleting: false,
    activeId: null
  };
  componentWillMount = () => {
    this.props.getLogs();
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      errors: nextProps.errors,
      logs: nextProps.logs.filter(log =>
        this.props.type === "sent" ? log.sent : !log.sent
      )
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
    this.props.getLog(id, this.props.history);
  };
  handleDelete = id => {
    this.setState({ deleting: true, activeId: id });
    this.props.deleteLog(id);
  };

  handleSend = id => {
    this.props.prepSend(id, this.props.history);
  };

  returnDate = (date, time, type) => {
    const timeDiff = new Date().getTimezoneOffset();
    let joined;
    let split = timeDiff.toString().split("");
    if (split.length < 4) {
      split.unshift("0");
      joined = split.join("");
    }
    const removeIndex = date.indexOf("T");
    const newDate = date
      .slice(0, removeIndex + 1)
      .concat(`${time}:00`)
      .concat(`.${joined}Z`);
    console.log(newDate);
    if (type === undefined) {
      return <Moment format="MM/DD/YYYY" date={newDate} />;
    } else {
      return newDate;
    }
  };

  getTime = time => {
    const t = moment(time, "HH:mm a");
    return t.format("HH:mm a");
  };

  getDiff = (startObj, endObj) => {
    const { classes } = this.props;
    const { startTime, startDay } = startObj;
    const { endTime, endDay } = endObj;

    const start = this.returnDate(startDay, startTime, null);
    const end = this.returnDate(endDay, endTime, null);
    const momentStart = moment(start, "YYYY-MM-DD HH:mm");
    const momentEnd = moment(end, "YYYY-MM-DD HH:mm");
    const duration = moment.duration(momentEnd.diff(momentStart));
    const hours = duration.asHours();

    return (
      <Typography className={classes.pos} color="textSecondary">
        {hours === 1 ? (
          <span>{hours.toFixed(2)} hour</span>
        ) : (
          <span>{hours.toFixed(2)} hours</span>
        )}
      </Typography>
    );
  };

  render() {
    const { type, classes } = this.props;
    const { query, logs, activeId } = this.state;
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
            placeholder={logs.length > 0 ? "Search logs" : "Nothing to search!"}
          />
        </div>
        <div className={classes.root}>
          {logs &&
            logs.map(log => (
              <CardComponent
                key={log._id}
                log={log}
                classes={classes}
                returnDate={this.returnDate}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
                getTime={this.getTime}
                getDiff={this.getDiff}
                activeId={activeId}
              />
            ))}
        </div>
        {/* 
        <table className="table">
          <tbody>
            <tr>
              {[
                "Title",
                "Date",
                "End Date",
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
                log.sent === false && type === "drafts" ? (
                  <tr key={log._id}>
                    <td>{log.title}</td>
                    <td>{this.returnDate(log.date, log.shiftStart)}</td>
                    <td>
                      {log.dateEnd ? (
                        this.returnDate(log.dateEnd, log.shiftEnd)
                      ) : (
                        <span>--</span>
                      )}
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
        </table> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { logs } = state.log;
  const { auth, deleting } = state;
  return { logs, auth, deleting };
};

export default connect(
  mapStateToProps,
  { getLogs, getLog, deleteLog, prepSend }
)(withRouter(withStyles(styles)(Table)));
