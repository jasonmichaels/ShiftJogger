import { NavOpenStyle } from "./NavStyles";

const NavOpen = ({ toggleNav }) => (
  <React.Fragment>
    <NavOpenStyle onClick={() => toggleNav()}>
      <div />
      <div />
      <div />
    </NavOpenStyle>
  </React.Fragment>
);

export default NavOpen;

