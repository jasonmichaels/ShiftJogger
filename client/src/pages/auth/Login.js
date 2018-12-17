import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../reduxors/actions/authActions";
import { TextField } from "../../components/common/TextField";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/drafts");
    }
  };
  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/drafts");
    }
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
    e.preventDefault();
    const loginCred = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(loginCred);
  };
  render() {
    const { errors, email, password } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center my-4">
                Welcome to ShiftJogger
              </h1>
              <p className="lead text-center">
                Sign in to your ShiftJogger account
              </p>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  type="email"
                  inputType="input"
                  placeholder="Email Address"
                  name="email"
                  error={errors.email}
                  value={email}
                  handleChange={this.handleChange}
                />
                <TextField
                  type="password"
                  inputType="input"
                  placeholder="Password"
                  name="password"
                  error={errors.password}
                  value={password}
                  handleChange={this.handleChange}
                />
                <input
                  type="submit"
                  className="btn btn-dark text-white btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
