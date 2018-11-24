import { NavCloseStyle } from "./NavStyles";

const NavClose = ({ toggleNav }) => (
  <NavCloseStyle onClick={() => toggleNav()}>X</NavCloseStyle>
);

export default NavClose;
