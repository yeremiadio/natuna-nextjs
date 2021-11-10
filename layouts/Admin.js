import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import AdminSidebar from "../components/Siderbars/AdminSidebar";

function Admin({ children, pageName }) {
  const auth = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  if (!auth.isAuthenticated) {
    router.replace("/login");
  }
  return (
    <>
      <div className="flex min-h-screen">
        <AdminSidebar open={open} setOpen={setOpen} user={auth.data?.user} />
        <div className="overflow-y-auto flex-1">
          <AdminNavbar
            user={auth.data?.user?.name}
            setOpen={setOpen}
            open={open}
          />
          <main className="wrapper">{children}</main>
        </div>
      </div>
    </>
  );
}

export default Admin;
