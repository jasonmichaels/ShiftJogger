import React from "react";
import Nav from "../Nav/nav";

const appLayout = props => {
  return (
    <React.Fragment>
      <Nav />
      {props.children}
    </React.Fragment>
  );
};

export default appLayout;
