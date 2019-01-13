import styled from "styled-components";

export const CardStyles = styled.div`
  transform: scale(0.8);
  transition: transform 0.15s ease-in;

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
  &:hover {
    transform: scale(0.9);
  }
`;

export const StyledCardRoot = styled.div`
  display: flex;
  margin: 1rem auto;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: hidden;
  background-color: #ebeff3;
  max-width: 1000px;
  &::before {
    content: "";
  }
  &::after {
    content: "";
  }
`;

export const StyledInput = styled.div`
  margin: 0 auto;
  width: 90%;
  max-width: calc(1000px - (1rem * 2));
`;
