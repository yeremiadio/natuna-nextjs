import React from "react";
import Admin from "../../layouts/Admin.js";

export default function dashboard() {
  return (
    <Admin>
      <div className="bg-section">
        <h3 className="font-bold text-xl text-gray-800">Dashboard</h3>
        <p className="font-base tracking-wide text-gray-400">
          Lihat Progress Penjualanmu disini.
        </p>
      </div>
    </Admin>
  );
}
