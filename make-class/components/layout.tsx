import Head from "next/head";
import React from "react";
import Footer from "./footer";
import Sidebar from "./sidebar/sidebar";
import HeadBar from "./headbar/headbar";
import styles from "./layout.module.css";
import { Headline1 } from "@class101/ui";

interface LayoutProps {
  children: React.ReactNode;
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Head>
        <Head>Myworkspace</Head>
      </Head>
      <header>
        <HeadBar />
        <Sidebar />
      </header>
      <main className={styles.main}>{children}</main>
      <footer style={{ marginLeft: "250px" }}>
        <Footer />
      </footer>
    </div>
  );
}
