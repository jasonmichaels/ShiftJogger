import React from "react";
import { connect } from "react-redux";

const SendForm = ({ user, log, auth }) => {
  return (
    <>
      <div>Send File</div>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  log: state.log,
  auth: state.auth
});

export default connect(mapStateToProps)(SendForm);
