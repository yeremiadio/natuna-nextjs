import { motion } from "framer-motion";
import Head from "next/head";
import Navbar from "../components/Navbars/Navbar";
import MainLayout from "../layouts/mainLayout";

export default function Home() {
  return <>test</>;
}

Home.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
