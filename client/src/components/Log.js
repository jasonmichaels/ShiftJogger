import React, { Component } from "react";
import { HeaderTextStyle } from "./componentStyles/headerStyles";
import { addLog, editLog, goBack } from "../reduxors/actions/logActions";
import { connect } from "react-redux";
import { TextField } from "./common/TextField";
import { isEmpty } from "../helpers/isEmpty";
import { withRouter } from "react-router-dom";
import { returnDate } from "../helpers/time";

import { FormStyle } from "./componentStyles/logStyles";

const initialState = {
  title: "",
  dateStart: "",
  dateEnd: "",
  shiftStart: "",
  shiftEnd: "",
  comments: "",
  pageState: "",
  checked: false,
  errors: {}
};
class Log extends Component {
  state = initialState;

  componentDidMount = () => {
    console.log(this.props.log);
  };

  handleChange = e => {
    const { errors } = this.state;
    if (!isEmpty(errors)) {
      this.setState({ errors: {} });
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.type === "new") {
      this.setState(initialState);
    }
  };

  componentWillMount = () => {
    let doTheStateDance;
    if (isEmpty(this.props.log)) {
      doTheStateDance = initialState;
    } else if (!isEmpty(this.props.log)) {
      const {
        title,
        dateStart,
        dateEnd,
        checked,
        shiftStart,
        shiftEnd,
        comments
      } = this.props.log;
      doTheStateDance = {
        title,
        dateStart: returnDate(dateStart),
        dateEnd: dateEnd !== null ? returnDate(dateEnd) : "",
        shiftStart,
        shiftEnd,
        comments,
        checked,
        pageState: "edit"
      };
    }
    this.setState(doTheStateDance);
  };

  handleSubmit = e => {
    const { addLog, editLog, log } = this.props;
    e.preventDefault();
    const {
      title,
      dateStart,
      dateEnd,
      checked,
      shiftEnd,
      shiftStart,
      comments,
      pageState
    } = this.state;
    if (pageState === "edit") {
      editLog(
        {
          title,
          dateStart,
          dateEnd,
          checked,
          shiftStart,
          shiftEnd,
          comments,
          type: "log"
        },
        log._id,
        this.props.history
      );
    } else {
      addLog(
        {
          title,
          dateStart,
          dateEnd,
          checked,
          shiftStart,
          shiftEnd,
          comments,
          type: "log"
        },
        this.props.history
      );
    }

    this.setState(initialState);
  };

  handleRedirect = () => {
    const { goBack, history } = this.props;
    this.setState(initialState);
    goBack("drafts", history);
  };

  handleCheck = e => {
    this.setState({
      checked: e.target.checked
    });
  };

  render() {
    const {
      title,
      dateStart,
      dateEnd,
      shiftStart,
      shiftEnd,
      comments,
      pageState,
      checked
    } = this.state;
    const { errors } = this.props;
    const isEnabled = title !== "" && dateStart !== "";
    const header = pageState === "edit" ? "Edit" : "New";
    return (
      <>
        <HeaderTextStyle>{header} Log</HeaderTextStyle>

        <FormStyle
          onSubmit={this.handleSubmit}
          style={{ width: "80%", maxWidth: "1000px", margin: "0 auto" }}>
          <div className="form-group mb-0" style={{ gridArea: "title" }}>
            <h4 align="left">Title</h4>
            <hr />
            <TextField
              name="title"
              autoFocus
              className="form-control"
              handleChange={this.handleChange}
              value={title}
              type="text"
              placeholder="Enter a title for your work log..."
              inputType="input"
              error={errors.title}
            />
            <input
              id="time-checkbox"
              name="checkbox"
              type="checkbox"
              defaultChecked={checked}
              onChange={this.handleCheck}
            />
            <label htmlFor="time-checkbox">
              <small>Does this log span more than one day?</small>
            </label>
          </div>
          <div
            style={{
              gridArea: "time"
            }}>
            <h4 align="left">Duration</h4>
            <hr />
            <TextField
              name="dateStart"
              handleChange={this.handleChange}
              value={dateStart}
              type="date"
              inputType="input"
              error={errors.dateStart}
              info={"Start Date"}
            />

            <TextField
              name="dateEnd"
              handleChange={this.handleChange}
              value={dateEnd}
              type="date"
              inputType="input"
              error={errors.date}
              disabled={!checked}
              info={"End Date"}
            />
            <TextField
              name="shiftStart"
              type="time"
              inputType="input"
              handleChange={this.handleChange}
              value={shiftStart}
              style={{ height: "48px" }}
              error={errors.shiftStart}
              info={"Start Time"}
            />
            <TextField
              name="shiftEnd"
              type="time"
              inputType="input"
              handleChange={this.handleChange}
              value={shiftEnd}
              style={{ height: "48px" }}
              info={"End Time"}
            />
          </div>

          <div className="form-row" style={{ gridArea: "message" }}>
            <div style={{ width: "100%", height: "100%" }}>
              <h4 align="left">Notes</h4>
              <hr />
              <TextField
                rows={10}
                name="comments"
                className="form-control"
                inputType="textarea"
                handleChange={this.handleChange}
                value={comments}
                placeholder="Leave a note!"
              />
            </div>
          </div>
          <div style={{ margin: "0", gridArea: "buttons" }}>
            <button
              className={!isEnabled ? "btn btn-light" : "btn btn-info"}
              style={{ marginRight: "5px", width: "80px" }}
              type="submit">
              Save
            </button>

            <button
              type="button"
              onClick={this.handleRedirect}
              className="btn btn-secondary mx-4 my-4"
              style={{ marginLeft: "5px" }}>
              Go Back
            </button>
          </div>
        </FormStyle>
      </>
    );
  }
}

Log.defaultProps = {
  type: "new"
};

const mapStateToProps = state => {
  const { auth, errors } = state;
  const { log } = state.log;
  return { auth, errors, log };
};

export default connect(
  mapStateToProps,
  { addLog, editLog, goBack }
)(withRouter(Log));
