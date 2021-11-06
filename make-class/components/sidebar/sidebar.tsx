import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "./sidebar.module.css";

export default function Sidebar() {
  return (
    <nav className={styles.nav}>
      <Link href="/onedayclass">
        <a>클래스 상세</a>
      </Link>
      <Link href="/onedayclass/create">
        <a>클래스 등록</a>
      </Link>
      <Link href="/inquiry">
        <a>1:1문의 내역</a>
      </Link>
    </nav>
  );
}
