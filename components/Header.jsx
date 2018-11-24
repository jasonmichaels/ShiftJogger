import NavOpen from './NavOpen'

const Header = (props) => (
  <React.Fragment>
    <header>
      <NavOpen />
      {props.children}
    </header>
    <style jsx>{`
      header {
        display: flex;
        align-items: center;
        width: 100vw;
        height: 70px;
        display: flex;
        text-transform: uppercase;
        font-size: 1em;
      }
    `}</style>
  </React.Fragment>
)

export default Header