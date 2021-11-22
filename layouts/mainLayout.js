import Navbar from "../components/Navbars/Navbar";
import Head from "next/head";
import { motion } from "framer-motion";
// import Head from '../'
function MainLayout({ children }) {
  return (
    <div>
      <Head>
        <title>"BUMDes Laut Sakti Daratan Bertuah"</title>
      </Head>
      <Navbar />
      <main>
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: {
              opacity: 0,
            },
            animate: {
              opacity: 1,
            },
          }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}

export default MainLayout;
