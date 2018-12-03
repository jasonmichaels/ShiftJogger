import styled from "styled-components";

export const FormStyleParent = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 50px 1fr 150px 1fr;
  grid-template-areas:
    "title title title"
    "date shiftStart shiftEnd"
    "comments comments comments"
    "submit . back";
  grid-gap: 10px;
  margin: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  .title {
    grid-area: title;
  }
  .date {
    grid-area: date;
  }
  .shiftStart {
    grid-area: shiftStart;
  }
  .shiftEnd {
    grid-area: shiftEnd;
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
