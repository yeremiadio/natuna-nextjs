import Navbar from "../components/Navbars/Navbar";
import Head from "next/head";
// import Head from '../'
function MainLayout({ children }) {
  return (
    <div>
      <Head>
        <title>"BUMDes Laut Sakti Daratan Bertuah"</title>
      </Head>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default MainLayout;
