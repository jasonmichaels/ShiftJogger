import React from 'react'
import Link from 'next/link'

const landingPage = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <Link href='/app'><a>App</a></Link> <br />
    </div>
  )
}

export default landingPage