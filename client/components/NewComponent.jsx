import React, { Component } from "react";
import { HeaderTextStyle } from "./HeaderStyles";
import { connect } from "react-redux";
import { saveDraft, goBack } from "../store";
import { createRandomString } from "../utils/utils";
import TimePicker from "react-bootstrap-time-picker";
import Router from "next/router";

const initialState = {
  title: "",
  date: "",
  shiftStart: "",
  shiftEnd: "",
  comments: "",
  timeStamp: null,
  logId: null
};
class New extends Component {
  state = initialState;

  handleChange = (e, type) => {
    !e.target
      ? this.setState({ [type]: e })
      : this.setState({ [type]: e.target.value });
  };

  componentDidMount = () => {
    const { fileToEdit, editing } = this.props;
    if (!editing) return;
    const { title, date, shiftStart, shiftEnd, comments, logId } = fileToEdit;
    this.setState({
      title,
      date,
      shiftStart,
      shiftEnd,
      comments,
      logId
    });
  };

  onSave = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    const { title, date, shiftEnd, shiftStart, comments, logId } = this.state;
    dispatch(
      saveDraft({
        title,
        date,
        shiftEnd,
        shiftStart,
        comments,
        timeStamp: Date.now(),
        logId: logId === null ? createRandomString(20) : logId
      })
    );
    this.setState(initialState);
    Router.push({
      pathname: "/draft"
    });
  };

  handleRedirect = () => {
    const { dispatch } = this.props;
    dispatch(goBack());
    Router.push({
      pathname: "/draft"
    });
  };

  render() {
    const { title, date, shiftStart, shiftEnd, comments } = this.state;
    const isEnabled =
      title !== "" && shiftStart !== "" && shiftEnd !== "" && date !== "";
    return (
      <>
        <HeaderTextStyle>NEW/EDIT SHIFT</HeaderTextStyle>
        <form onSubmit={this.onSave}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="title-field">Log Title</label>
              <input
                id="title-field"
                aria-describedby="title-help"
                autoFocus
                className="form-control title"
                onChange={e => this.handleChange(e, "title")}
                value={title}
                type="text"
                placeholder="Enter a title for your work log..."
              />
              <small id="title-help" className="form-text text-muted">
                Title field is required!
              </small>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="date-field">Date</label>
              <input
                aria-describedby="date-help"
                id="date-field"
                className="form-control"
                onChange={e => this.handleChange(e, "date")}
                value={date}
                type="date"
              />
              <small id="date-help" className="form-text text-muted">
                Date field is required
              </small>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="shift-start-field">Shift start time</label>
              <TimePicker
                id="shift-start-field"
                aria-describedby="start-time-help"
                className="shiftStart"
                onChange={e => this.handleChange(e, "shiftStart")}
                value={shiftStart}
                type="time"
                step={15}
              />
              <small id="start-time-help" className="form-text text-muted">
                Start time field is required
              </small>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="end-time-field">Shift end time</label>
              <TimePicker
                id="end-time-field"
                aria-describedby="end-time-help"
                className="shiftEnd"
                onChange={e => this.handleChange(e, "shiftEnd")}
                value={shiftEnd}
                type="time"
                step={15}
              />
              <small id="end-time-help" className="form-text text-muted">
                End time field is required
              </small>
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="comments-field">Log notes</label>
            <textarea
              id="comments-field"
              aria-describedby="comments-help"
              className="form-control"
              rows={6}
              onChange={e => this.handleChange(e, "comments")}
              value={comments}
              placeholder="Leave a note!"
            />
            <small id="comments-help" className="form-text text-muted">
              Any notes about the work? Receipts? Leave it here!
            </small>
          </div>
          <div className="form-group row">
            <button
              className="btn btn-primary mx-4 my-4"
              type="submit"
              onClick={this.onSave}
              disabled={!isEnabled}>
              Save
            </button>

            <button
              type="button"
              onClick={this.handleRedirect}
              className="btn btn-secondary mx-4 my-4">
              Go Back
            </button>
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { fileToEdit, editing } = state;
  return { fileToEdit, editing };
};

export default connect(mapStateToProps)(New);
