import styled from "styled-components";

export const HeaderStyle = styled.header`
  display: flex;
  align-items: center;
  height: 70px;
  text-transform: uppercase;
  font-size: 1em;
`;

export const AppTitle = styled.h1`
  margin: 0 auto 0 auto;
`;

export const HeaderTextStyle = styled.h2`
  margin: 0;
  text-align: center;
  padding-left: 1rem;
  & ~ * {
    text-align: center;
  }
`;
