import Link from "next/link";
import { NavBarStyle } from "./NavStyles";
import NavClose from "./NavClose";

const Navbar = ({ isOpen, toggleNav }) => (
  <NavBarStyle isOpen={isOpen}>
    <ul>
      <NavClose toggleNav={toggleNav} />
      <li>
        <Link href="/">
          <a>Dashboard</a>
        </Link>
      </li>
      <li>
        <Link href="/new">
          <a>New</a>
        </Link>
      </li>
      <li>
        <Link href="/draft">
          <a>Draft</a>
        </Link>
      </li>
      <li>
        <Link href="/sent">
          <a>Sent</a>
        </Link>
      </li>
    </ul>
  </NavBarStyle>
);

export default Navbar;
