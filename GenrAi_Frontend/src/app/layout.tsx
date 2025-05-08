import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Music Genre Classification",
  description: "Upload your track and let our AI identify the genre. Experience the power of machine learning in music classification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="relative w-full flex items-center justify-center">
        <Navbar/>
        </div>

        {children}
      </body>
    </html>
  );
}
