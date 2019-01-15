import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField } from "../common/TextField";
import { registerUser } from "../../reduxors/actions/authActions";
import PropTypes from "prop-types";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };
  componentDidMount = () => {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      type: "register"
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { name, email, password, password2, errors } = this.state;
    return (
      <div
        className="register"
        style={{
          width: "100%",
          textAlign: "center",
          margin: "0 auto",
          height: "calc(100vh - 83px)"
        }}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center my-4">Join ShiftJogger</h1>
              <p className="lead text-center">
                Create your account here. It's fast and easy!
              </p>
              <form noValidate onSubmit={e => this.handleSubmit(e)}>
                <TextField
                  name="name"
                  placeholder="Name"
                  value={name}
                  error={errors.name}
                  type="text"
                  handleChange={this.handleChange}
                  inputType="input"
                  info="Tell us who you are!"
                />
                <TextField
                  name="email"
                  placeholder="Email"
                  value={email}
                  error={errors.email}
                  type="text"
                  handleChange={this.handleChange}
                  inputType="input"
                  autoComplete="username"
                />
                <TextField
                  name="password"
                  placeholder="Password"
                  value={password}
                  error={errors.password}
                  type="password"
                  handleChange={this.handleChange}
                  inputType="input"
                  autoComplete="new-password"
                  info="Passwords must be between 6 and 30 characters"
                />
                <TextField
                  name="password2"
                  placeholder="Confirm Password"
                  value={password2}
                  error={errors.password2}
                  type="password"
                  handleChange={this.handleChange}
                  inputType="input"
                  autoComplete="new-password"
                />
                <button className="btn btn-dark text-white btn-block mt-4">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { auth, errors } = state;
  return { auth, errors };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
