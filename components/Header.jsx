const Header = (props) => (
  <React.Fragment>
    <header>
      {props.children}
    </header>
    <style jsx>{`
      header {
        text-transform: uppercase;
        font-size: 1.4em;
        display: inline-block;
        margin: 2em 0 0 2em;
      }
    `}</style>
  </React.Fragment>
)

export default Header