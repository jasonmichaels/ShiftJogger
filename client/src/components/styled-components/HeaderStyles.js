import styled from "styled-components";

export const HeaderMainStyle = styled.header`
  display: flex;
  align-items: center;
  height: 2.5rem;
  text-transform: uppercase;
  font-size: 1em;
`;

export const AppTitle = styled.h1`
  margin: 0 auto 0 auto;
`;

export const HeaderTextStyle = styled.h2`
  margin: 2rem 0;
  text-align: center;
  padding: 1rem 0;
  & ~ * {
    text-align: center;
  }
`;
