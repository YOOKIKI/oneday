import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "./sidebar.module.css";
import { NavDropdown } from "react-bootstrap";

export default function Sidebar() {
  return (
    <nav className={styles.nav}>
      <Link href="/reservation">
        <a>내 클래스 목록</a>
      </Link>
      {/* <Link href="/onedayclass">
        <a>클래스 예약</a>
      </Link> */}
      <Link href="/inquiry">
        <a>1:1문의</a>
      </Link>
      {/* <Link href="">
        <a>🛠</a>
      </Link> */}
    </nav>
  );
}
