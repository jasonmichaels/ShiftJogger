import NavOpen from "./NavOpen";
import { HeaderStyle, HeaderTextStyle } from "./HeaderStyles";

const Header = props => {
  const { headTitle, toggleNav } = props;
  return (
    <React.Fragment>
      <HeaderStyle>
        <NavOpen toggleNav={toggleNav} />
        <HeaderTextStyle> {headTitle}</HeaderTextStyle>
      </HeaderStyle>
    </React.Fragment>
  );
};

export default Header;
