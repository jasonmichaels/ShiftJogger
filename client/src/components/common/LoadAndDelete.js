import React from "react";
import styled, { keyframes } from "styled-components";

/*
  - ldsDualRing for deletion animation (logs) using styled-component keyframes
*/

const ldsDualRing = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

const StyledLoadingAndDelete = styled.div`
  .lds-dual-ring {
    display: inline-block;
    width: 22px;
    height: 22px;
    margin: 0 auto;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 22px;
    height: 22px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid black;
    border-color: black transparent black transparent;
    animation: ${ldsDualRing} 1.2s linear infinite;
  }
`;

export const LoadAndDelete = () => {
  return (
    <StyledLoadingAndDelete>
      <div className="lds-dual-ring" />
    </StyledLoadingAndDelete>
  );
};
