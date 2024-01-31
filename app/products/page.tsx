import type { Metadata } from "next";
import React, { Suspense } from "react";
import Products from "../component/products/Products";
import style from "./products.module.css";

export const metadata: Metadata = {
  title: "Products List",
  description: "Usedo Products and Listting",
  keywords: ["usedo blog", "usedo product", "usedo listing"],
  robots: {
    index: true,
    nocache: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return (
    <main className={style.main}>
      <div>
        <Suspense fallback={<span className="loader-spiner"></span>}>
          <Products />
        </Suspense>
      </div>
    </main>
  );
}
