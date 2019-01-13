import React, { Component } from "react";
import ReactLoading from "react-loading";
import { connect } from "react-redux";
import { TextField } from "../common/TextField";
import { HeaderTextStyle } from "../componentStyles/headerStyles";
import { getLog, sendLog } from "../../reduxors/actions/logActions";

const initialState = {
  destEmail: "",
  fromEmail: "",
  subject: "",
  log: {},
  user: {},
  errors: {}
};
class SendForm extends Component {
  state = initialState;

  componentDidMount = () => {
    this.props.getLog();
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    const { sendLog, history, log, user } = this.props;
    e.preventDefault();
    const { destEmail, fromEmail, subject } = this.state;
    sendLog(
      {
        destEmail,
        fromEmail,
        subject,
        log,
        user
      },
      log._id,
      history
    );
    this.setState(initialState);
  };
  render() {
    const { destEmail, fromEmail, subject, errors } = this.state;
    const { building } = this.props;
    return (
      <>
        {building ? (
          <div
            style={{
              width: "50vw",
              height: "50vh",
              margin: "0 auto"
            }}>
            <ReactLoading
              style={{
                margin: "0 auto"
              }}
              type={"balls"}
              color={"black"}
              height={150}
              width={150}
            />
          </div>
        ) : (
          <div className="send-form" style={{ marginTop: "1rem" }}>
            <HeaderTextStyle>Send Log Invoice</HeaderTextStyle>
            <form
              onSubmit={this.handleSubmit}
              style={{ width: "80%", maxWidth: "800px", margin: "0 auto" }}>
              <div className="form-group">
                <TextField
                  name="subject"
                  autoFocus
                  className="form-control"
                  handleChange={this.handleChange}
                  value={subject}
                  type="text"
                  placeholder="Email subject line..."
                  inputType="input"
                  error={errors.subject}
                />
              </div>
              <div className="form-group mb-0">
                <TextField
                  name="destEmail"
                  autoFocus
                  className="form-control"
                  handleChange={this.handleChange}
                  value={destEmail}
                  type="email"
                  placeholder="Destination email..."
                  inputType="input"
                  error={errors.destEmail}
                />
              </div>
              <div className="form-group">
                <TextField
                  name="fromEmail"
                  autoFocus
                  className="form-control"
                  handleChange={this.handleChange}
                  value={fromEmail}
                  type="email"
                  placeholder="Your email..."
                  inputType="input"
                  error={errors.fromEmail}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-dark">
                  Send!
                </button>
              </div>
            </form>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  const { auth, errors } = state;
  const { user } = state.auth;
  const { log, building } = state.log;
  return { auth, errors, user, log, building };
};

export default connect(
  mapStateToProps,
  { sendLog, getLog }
)(SendForm);
