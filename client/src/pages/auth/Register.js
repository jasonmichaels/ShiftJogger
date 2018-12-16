import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField } from "../../components/common/TextField";
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
      this.props.history.push("/drafts");
    }
  };

  componentWillReceiveProps = nextProps => {
    console.log(nextProps);
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
    console.log("submitted");
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
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
          marginTop: "50px"
        }}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create Your ShiftJogger Account
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
                />
                <TextField
                  name="email"
                  placeholder="Email"
                  value={email}
                  error={errors.email}
                  type="text"
                  handleChange={this.handleChange}
                  inputType="input"
                />
                <TextField
                  name="password"
                  placeholder="Password"
                  value={password}
                  error={errors.password}
                  type="password"
                  handleChange={this.handleChange}
                  inputType="input"
                />
                <TextField
                  name="password2"
                  placeholder="Confirm Password"
                  value={password2}
                  error={errors.password2}
                  type="password"
                  handleChange={this.handleChange}
                  inputType="input"
                />
                <button className="btn btn-info btn-block mt-4">
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
