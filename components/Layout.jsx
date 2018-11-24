import Head from 'next/head'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Layout = (props) => (
  <div>
    <Head>
      <title>Shift Logger</title>
      {/* <link rel="stylesheet" href="https://bootswatch.com/4/spacelab/bootstrap.min.css"></link> */}
    </Head>
    <Header>{props.children}</Header>
    <Navbar />
    <style jsx global>{`
      body {
        box-sizing: border-box;
        margin: 0;
      }

      h1 { 
        margin: 0 0 0 1em;
      }
    `}</style>
  </div>
)

export default Layout