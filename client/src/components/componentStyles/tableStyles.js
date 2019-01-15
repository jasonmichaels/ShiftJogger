import styled from "styled-components";

export const CardStyles = styled.div`
  transform: scale(1);
  transition: transform 0.15s ease-in;
  margin: 1rem auto 0 auto;

  &.title {
    font-size: 12px;
  }
  &.card {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 5px;
    width: 30%;
    margin: 0 0.5rem;
    height: auto;
  }
  &.actions {
    display: flex;
    justify-content: space-around;
  }
  &:hover {
    transform: scale(1.05);
  }
`;

export const StyledCardRoot = styled.div`
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  overflow: hidden;
  background-color: #ebeff3;
  width: 90%;
  justify-content: center;
  max-width: calc(1000px - (1rem * 2));
  height: calc(100vh - 100px);
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
