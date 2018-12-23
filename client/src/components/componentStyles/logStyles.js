import styled from "styled-components";

export const FormStyle = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "title title"
    "time message"
    "buttons buttons";
  grid-template-rows: auto;
  grid-gap: 1.5rem;
  align-content: space-between;
  & select,
  input {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
  @media screen and (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "title"
      "time"
      "message"
      "buttons";
    & select,
    input {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }
`;
