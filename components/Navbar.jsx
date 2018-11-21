import Link from 'next/link'
import NavClose from './NavClose'

const Navbar = () => (
  <nav className="navbar">
    <ul>
      <NavClose />
      <li><Link href="/"><a>Dashboard</a></Link></li>
      <li><Link href="/new"><a>New</a></Link></li>
      <li><Link href="/draft"><a>Draft</a></Link></li>
    </ul>
    <style jsx>{`
      .navbar {
        position: relative;
        display: inline-block;
        float: left;
        background: lightgrey;
        width: 15vw;
        height 100vh;
      }
      ul {
        list-style: none;
        padding: 40px 0 0 20px;
        margin: 50px 0 0 0;
      } 
      ul li {
        margin: 20px 0 0 0;
      }
      ul li a {
        text-transform: uppercase;
        text-decoration: none;
        color: black;
      }

    `}</style>
  </nav>
)

export default Navbar