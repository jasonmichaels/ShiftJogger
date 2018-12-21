import React, { Component } from "react";
import { HeaderTextStyle } from "./HeaderStyles";
import styled from "styled-components";
import { addLog, editLog, goBack } from "../reduxors/actions/logActions";
import { connect } from "react-redux";
import { TextField } from "./common/TextField";
import { isEmpty } from "../helpers/isEmpty";
import { withRouter } from "react-router-dom";

const FormStyle = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "title title"
    "time message"
    "buttons buttons";
  grid-template-rows: auto;
  grid-gap: 1.5rem;
  align-content: space-between;
  & select,
  input {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
  @media screen and (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "title"
      "time"
      "message"
      "buttons";
    & select,
    input {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }
`;

const initialState = {
  title: "",
  date: "",
  shiftStart: "",
  shiftEnd: "",
  comments: "",
  pageState: "",
  errors: {}
};
class Log extends Component {
  state = initialState;

  handleChange = e => {
    this.setState({
      errors: {}
    });
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  };

  componentDidMount = () => {
    if (!isEmpty(this.props.log)) {
      const { title, date, shiftStart, shiftEnd, comments } = this.props.log;
      this.setState({
        title,
        date,
        shiftStart,
        shiftEnd,
        comments,
        pageState: "edit"
      });
    } else {
      this.setState({
        initialState
      });
    }
  };

  handleSubmit = e => {
    const { dispatch, log } = this.props;
    e.preventDefault();
    const {
      title,
      date,
      shiftEnd,
      shiftStart,
      comments,
      pageState
    } = this.state;
    if (pageState === "edit") {
      dispatch(
        editLog({
          title,
          date,
          shiftStart,
          shiftEnd,
          comments
        }),
        log._id,
        this.props.history
      );
    } else {
      dispatch(
        addLog(
          {
            title,
            date,
            shiftStart,
            shiftEnd,
            comments
          },
          this.props.history
        )
      );
    }

    this.setState(initialState);
  };

  handleRedirect = () => {
    const { dispatch, history } = this.props;
    dispatch(goBack(history));
  };

  render() {
    const {
      title,
      date,
      shiftStart,
      shiftEnd,
      comments,
      pageState,
      errors
    } = this.state;
    const isEnabled = title !== "" && date !== "";
    const header = pageState === "edit" ? "Edit" : "New";
    return (
      <>
        <HeaderTextStyle>{header} Log</HeaderTextStyle>

        <FormStyle
          onSubmit={this.handleSubmit}
          style={{ width: "80%", maxWidth: "1000px", margin: "0 auto" }}>
          <div className="form-group mb-0" style={{ gridArea: "title" }}>
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
          </div>
          <div
            style={{
              gridArea: "time"
            }}>
            <div className="form-group">
              <TextField
                name="date"
                handleChange={this.handleChange}
                value={date}
                type="date"
                inputType="input"
                error={errors.date}
              />
            </div>
            <div className="form-group">
              <TextField
                name="shiftStart"
                type="time"
                inputType="input"
                handleChange={this.handleChange}
                value={shiftStart}
                style={{ height: "48px" }}
                error={errors.shiftStart}
              />
            </div>
            <div className="form-group">
              <TextField
                name="shiftEnd"
                type="time"
                inputType="input"
                handleChange={this.handleChange}
                value={shiftEnd}
                style={{ height: "48px" }}
              />
            </div>
          </div>

          <div className="form-row" style={{ gridArea: "message" }}>
            <div
              className="form-group"
              style={{ width: "100%", height: "100%" }}>
              <TextField
                rows={6}
                name="comments"
                className="form-control"
                inputType="textarea"
                handleChange={this.handleChange}
                value={comments}
                placeholder="Leave a note!"
              />
            </div>
          </div>
          <div
            className="form-group"
            style={{ margin: "0", gridArea: "buttons" }}>
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

const mapStateToProps = state => {
  const { auth, errors } = state;
  const { log } = state.log;
  return { auth, errors, log };
};

export default connect(mapStateToProps)(withRouter(Log));
