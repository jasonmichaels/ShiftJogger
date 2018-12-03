import NavOpen from "./NavOpen";
import { HeaderStyle, AppTitle, HeaderTextStyle } from "./HeaderStyles";

const Header = props => {
  const { headTitle, toggleNav } = props;
  return (
    <React.Fragment>
      <HeaderStyle>
        <NavOpen toggleNav={toggleNav} />
        <AppTitle>Shift Logger</AppTitle>
        <HeaderTextStyle> {headTitle}</HeaderTextStyle>
      </HeaderStyle>
    </React.Fragment>
  );
};

export default Header;
