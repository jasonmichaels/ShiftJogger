import styled from "styled-components";

export const NavBarStyle = styled.nav`
  position: relative;
  display: ${props => (props.isOpen ? "inline-block" : "none")};
  background: lightgrey;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  transition: display 2s ease-out;
  grid-column-start: 0;
  grid-column-end: 1;
  & ul {
    list-style: none;
    padding: 40px 0 0 20px;
    margin: 50px 0 0 0;
    & li {
      margin: 20px 0 0 0;
      & a {
        text-transform: uppercase;
        text-decoration: none;
        color: black;
      }
    }
  }
  @media screen and (min-width: 850px) {
    display: block;
    width: 15vw;
    min-width: 150px;
    max-width: 250px;
    height: 100vh;
  }
`;

export const NavCloseStyle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`;

export const NavOpenStyle = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 27px;
  width: 36px;
  margin: 0 0 0 1em;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  & > div {
    width: 36px;
    height: 2px;
    background: black;
  }
  @media screen and (min-width: 850px) {
    display: none;
  }
`;
