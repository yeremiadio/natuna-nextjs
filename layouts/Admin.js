import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import AdminSidebar from "../components/Siderbars/AdminSidebar";
import { RESET_USER, RESET_ERRORS } from "../constants/types";
import { motion } from "framer-motion";
import Head from "next/head";

function Admin({ children }) {
  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const ac = new AbortController();
    if (!auth.isAuthenticated || errors.entries.status === 401) {
      dispatch({
        type: RESET_USER,
      });
      dispatch({
        type: RESET_ERRORS,
      });
      router.replace("/login");
    } else {
      return ac.abort();
    }
  }, [auth, errors]);
  return (
    <>
      <Head>
        <title>BUMDes Laut Sakti Daratan Bertuah</title>
      </Head>
      <div className="flex min-h-screen" style={{ background: "#f7fafc" }}>
        <AdminSidebar open={open} setOpen={setOpen} />
        <div className="overflow-y-auto flex-1">
          <AdminNavbar user={auth.user} setOpen={setOpen} open={open} />
          <main className="wrapper">
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
      </div>
    </>
  );
}

export default Admin;
