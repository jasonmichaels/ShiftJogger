import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Landing extends Component {
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/drafts");
    }
  };
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">ShiftJogger</h1>
                <p className="lead"> </p>
                <hr
                  style={{
                    border: 0,
                    margin: 0,
                    marginBottom: "2rem",
                    width: "100%",
                    height: "1px",
                    backgroundColor: "white",
                    borderRadius: "50%"
                  }}
                />
                <Link
                  to="/auth/register"
                  className="btn btn-lg btn-dark text-white mr-4">
                  Sign Up
                </Link>
                <Link to="/auth/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  return { auth };
};

export default connect(mapStateToProps)(Landing);
