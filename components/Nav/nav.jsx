import React from 'react'
import Link from 'next/link'

const Nav = (props) => {
    return (
      <nav>
        <ul>
          <li><Link href='/app/dashboard'><a>Dashboard</a></Link></li>
          <li><Link href='/app/new'><a>New</a></Link></li>
          <li><Link href='/app/saved'><a>Saved</a></Link></li>
          <li><Link href='/app/sent'><a>Sent</a></Link></li>
        </ul>
      </nav>
    ) 
} 

export default Nav