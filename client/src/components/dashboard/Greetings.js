import React from "react";
import moment from "moment";

export const Greetings = ({ name }) => {
  const today = moment(Date.now()).format("dddd");
  return (
    <div>
      Hope you're having a stellar {today}, {name}!
    </div>
  );
};
