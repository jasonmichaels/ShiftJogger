import Link from "next/link";
import { NavBarStyle } from "./NavStyles";
import NavClose from "./NavClose";

const Navbar = ({ isOpen, toggleNav }) => (
  <NavBarStyle isOpen={isOpen}>
    <ul>
      <NavClose toggleNav={toggleNav} />
      <li>
        <Link href="/">
          <a onClick={toggleNav}>Dashboard</a>
        </Link>
      </li>
      <li>
        <Link href="/new">
          <a onClick={toggleNav}>New</a>
        </Link>
      </li>
      <li>
        <Link href="/draft">
          <a onClick={toggleNav}>Draft</a>
        </Link>
      </li>
      <li>
        <Link href="/sent">
          <a onClick={toggleNav}>Sent</a>
        </Link>
      </li>
    </ul>
  </NavBarStyle>
);

export default Navbar;
