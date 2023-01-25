import { Box } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Footer from "../components/Footer";
import MainLayout from "../components/layouts/main";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <Box>
      <Navbar />
      <MainLayout />
      <Footer />
    </Box>
  );
}
