import styled from "styled-components";

export const FormStyleParent = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 50px 1fr 150px 1fr;
  grid-template-areas:
    "title title title"
    "label label label"
    "comments comments comments"
    "submit . back";
  grid-gap: 10px;
  margin: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  .title {
    grid-area: title;
  }
  .label {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-around;
  }
  .comments {
    grid-area: comments;
  }
  .submit {
    grid-area: submit;
  }
  .back {
    grid-area: back;
  }
`;
