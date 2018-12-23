import styled from "styled-components";

export const CardStyles = styled.div`
  &.title {
    font-size: 12px;
  }
  &.card {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-gap: 8px;
    width: 300px;
    min-height: 280px;
    margin: 1rem;
  }
  &.pos {
    margin-top: 1rem;
  }
  &.actions {
    display: flex;
    justify-content: space-between;
  }
`;

export const StyledCardRoot = styled.div`
  display: flex;
  margin: 1rem auto;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: hidden;
  background-color: #fff;
  max-width: 1000px;
  &::before {
    content: "";
  }
  &::after {
    content: "";
  }
`;
