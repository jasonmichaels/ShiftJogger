
const NavOpen = props => (
  <React.Fragment>
    <button className="nav-open">
      <div className="toggle-button-line" />
      <div className="toggle-button-line" />
      <div className="toggle-button-line" />
    </button>
    <style jsx>{`
      .nav-open {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 27px;
        width: 36px;
        margin: 0 0 0 1em;
        background: transparent;
        border: none;
        padding: 0;
      }

      .toggle-button-line {
        width: 36px;
        height: 2px;
        background: black;
      }
    `}</style>
  </React.Fragment>
)

export default NavOpen