import React from "react";
import Sidebar from "@/components/Sidebar";

import "./style.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="main">
            <Sidebar />
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  );
}


// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import classNames from "classnames";
// import "./globals.css";
// import React from "react";
//
// const inter = Inter({ subsets: ["latin"] });
//
// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
//
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={classNames(inter.className, "app-router-body")}>
//         {children}
//       </body>
//     </html>
//   );
// }
