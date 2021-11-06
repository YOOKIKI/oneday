import Layout from "../../components/layout";
import React from "react";
import Link from "next/link";

export default function inquiry() {
  return (
    <Layout>
      <article className="d-flex">
        <section>1:1문의 나의 클래스</section>
      </article>
      <Link href="/inquiry/list">
        <a className="">1:1문의등록(클래스목록)</a>
      </Link>
      <h5>
        <Link href="/inquiry/create">
          <a className="">1:1문의등록</a>
        </Link>
      </h5>
    </Layout>
  );
}
