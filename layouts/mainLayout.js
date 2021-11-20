import Navbar from "../components/Navbars/Navbar";
import Head from "next/head";
// import Head from '../'
function MainLayout({ children, title }) {
  return (
    <div>
      <Head>
        <title>
          {title
            ? title - "BUMDes Laut Sakti Daratan Bertuah"
            : "BUMDes Laut Sakti Daratan Bertuah"}
        </title>
      </Head>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default MainLayout;
