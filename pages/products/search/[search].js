import { useRouter } from "next/router";
import React from "react";
import MainLayout from "../../../layouts/mainLayout";

export default function searchProduct() {
  const router = useRouter();
  console.log(router.query);
  return <div>
      
  </div>;
}

searchProduct.layout = MainLayout;
