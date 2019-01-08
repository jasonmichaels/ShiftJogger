import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { HeaderTextStyle } from "../componentStyles/headerStyles";
import { StyledCardRoot } from "../componentStyles/tableStyles";
import CardComponent from "../CardComponent";
import { StyledInput } from "../componentStyles/tableStyles";

export const TableContent = ({
  logs,
  query,
  type,
  handleQuery,
  handleDelete,
  handleEdit,
  handleSend,
  activeId,
  handleViewPDF
}) => {
  console.log(logs);
  return (
    <>
      <HeaderTextStyle>{type === "drafts" ? "Drafts" : "Sent"}</HeaderTextStyle>
      <StyledInput
        style={{
          margin: "0 auto",
          width: "90%",
          maxWidth: "calc(1000px - (1rem * 2))"
        }}>
        <input
          className="form-control"
          type="text"
          value={query}
          onChange={e => handleQuery(e.target.value)}
          placeholder={
            logs !== null && logs.length > 0
              ? "Search logs by title"
              : "Nothing to search!"
          }
          disabled={logs !== null ? false : true}
        />
      </StyledInput>
      <StyledCardRoot>
        {logs !== null && logs.length > 0 ? (
          logs.map(log => {
            return (
              log.displayed && (
                <CardComponent
                  key={log._id}
                  log={log}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  activeId={activeId}
                  type={type}
                  handleSend={type === "drafts" ? handleSend : null}
                  handleViewPDF={type === "drafts" ? null : handleViewPDF}
                />
              )
            );
          })
        ) : (
          <span>No logs to search!</span>
        )}
      </StyledCardRoot>
    </>
  );
};
