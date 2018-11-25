import NavOpen from "./NavOpen";
import { HeaderStyle, HeaderTextStyle } from "./HeaderStyles";

const Header = props => {
  const { headTitle, toggleNav } = props;
  console.log(headTitle);
  return (
    <React.Fragment>
      <HeaderStyle>
        <NavOpen toggleNav={toggleNav} />
        <HeaderTextStyle> {headTitle.children}</HeaderTextStyle>
      </HeaderStyle>
    </React.Fragment>
  );
};

export default Header;
