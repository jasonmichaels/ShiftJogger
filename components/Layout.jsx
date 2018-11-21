import Head from 'next/head'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Layout = (props) => (
  <div>
    <Head>
      <title>Shifteez</title>
      {/* <link rel="stylesheet" href="https://bootswatch.com/4/spacelab/bootstrap.min.css"></link> */}
    </Head>
    <Header>{props.children}</Header>
    <Navbar />
    <style jsx global>{`
      body {
        margin: 0;
      }
    `}</style>
  </div>
)

export default Layout