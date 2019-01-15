import styled from "styled-components";

export const StyledDashboard = styled.div`
  max-width: 1000px;
  height: calc(100vh - 100px);
  display: grid;
  padding: 2rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "upper-left upper-right"
    "lower-left lower-right"
    ". .";
  margin: auto auto;
  padding: 0;

  @media screen and (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "upper-left"
      "lower-left"
      "upper-right"
      "lower-right";
  }
  & * {
    text-align: center;
  }
  & .upper-left {
    width: 100%;
    height: 100%;
    grid-area: upper-left;
    display: grid;
    justify-content: center;
    align-content: center;
    padding: 1rem;
    font-size: 2rem;
  }
  & .upper-right {
    width: 100%;
    height: 100%;
    grid-area: upper-right;
    display: grid;
    justify-content: center;
    align-content: center;
  }
  & .lower-left {
    width: 100%;
    height: 100%;
    grid-area: lower-left;
    display: grid;
    justify-content: center;
    align-content: center;
  }
  & .lower-right {
    width: 100%;
    height: 100%;
    grid-area: lower-right;
    display: grid;
    justify-content: center;
    align-content: center;
  }
`;

export const DashboardParent = styled.div`
  width: 100%;
  height: 75%;
`;
