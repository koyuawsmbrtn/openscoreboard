import type { Metadata } from "next";
import "../globals.css";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar/navbar";

export const metadata: Metadata = {
  title: "OpenScoreboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="container max-w-5xl py-8 mx-auto my-[80]">
        <div className="flex flex-col gap-4">{children}</div>
      </div>
      <Footer />
    </>
  );
}
