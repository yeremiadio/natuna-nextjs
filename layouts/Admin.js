import React, { useEffect } from "react";
import { admin } from "../config/privateRoute";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { useRouter } from "next/router";

function Admin({ children }) {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  if (!auth.isAuthenticated) {
    router.replace("/login");
  }
  return (
    <>
      <div className="container p-4">{children}</div>
    </>
  );
}

export default Admin;

// const withAuth = admin(Admin);

// withAuth.propTypes = {
//   auth: PropTypes.object.isRequired,
// };
