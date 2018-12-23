import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField } from "../common/TextField";
import { HeaderTextStyle } from "../componentStyles/headerStyles";
import { getLog, sendLog } from "../../reduxors/actions/logActions";
import { isEmpty } from "../../helpers/isEmpty";

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
    this.props.dispatch(getLog);
    const { log, auth } = this.props;

    if (!isEmpty(log) && auth.isAuthenticated) {
      this.setState({ log, user: auth.user });
    }
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
      [e.target.name]: e.target.get
    });
  };

  handleSubmit = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    const { destEmail, fromEmail, subject, user, log } = this.state;
    dispatch(
      sendLog(
        {
          destEmail,
          fromEmail,
          subject,
          userId: user.id,
          log
        },
        log._id,
        this.props.history
      )
    );
    this.setState(initialState);
  };
  render() {
    const { destEmail, fromEmail, subject, errors } = this.state;
    return (
      <>
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
      </>
    );
  }
}

const mapStateToProps = state => {
  const { auth, errors, user } = state;
  const { log } = state.log;
  return { auth, errors, user, log };
};

export default connect(mapStateToProps)(SendForm);
