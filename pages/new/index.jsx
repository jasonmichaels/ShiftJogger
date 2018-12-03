import React, { Component } from "react";
import { HeaderTextStyle } from "../../components/HeaderStyles";
import Link from "next/link";
import { connect } from "react-redux";
import { saveDraft } from "../../store";
import { createRandomString } from "../../utils/utils";
import { FormStyleParent } from "../../components/FormStyles";

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
    this.setState({
      [type]: e.target.value
    });
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
  };

  render() {
    const { title, date, shiftStart, shiftEnd, comments } = this.state;
    const isEnabled =
      title !== "" && shiftStart !== "" && shiftEnd !== "" && date !== "";
    return (
      <>
        <HeaderTextStyle>New</HeaderTextStyle>
        <h1>NEW/EDIT SHIFT</h1>
        <FormStyleParent>
          <input
            autoFocus
            className="title"
            onChange={e => this.handleChange(e, "title")}
            value={title}
            type="text"
            placeholder="Enter a title for your work log..."
          />
          <label>
            Date
            <input
              className="date"
              onChange={e => this.handleChange(e, "date")}
              value={date}
              type="date"
            />
          </label>
          <label>
            Start Date
            <input
              className="shifStart"
              onChange={e => this.handleChange(e, "shiftStart")}
              value={shiftStart}
              type="date"
            />
          </label>
          <label>
            Start End
            <input
              className="shiftEnd"
              onChange={e => this.handleChange(e, "shiftEnd")}
              value={shiftEnd}
              type="date"
            />
          </label>  
          <textarea
            className="comments"
            onChange={e => this.handleChange(e, "comments")}
            value={comments}
            type="text"
            placeholder="Leave a note!"
          />
          <input
            className="submit"
            type="submit"
            onClick={this.onSave}
            value="Save Draft"
            disabled={!isEnabled}
          />
          <Link href="/">
            <button className="back">Go Back</button>
          </Link>
        </FormStyleParent>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { fileToEdit, editing } = state;
  return { fileToEdit, editing };
};

export default connect(mapStateToProps)(New);
