import { Raleway } from "next/font/google";
import "./globals.css";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import {Toaster} from "@/components/ui/sonner";

const google_font = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={google_font.className}>
        <div className={'md:px-20'}>
          <Header/>
          {children}
          <Toaster/>

        </div>
        <Footer/>
      </body>
    </html>
  );
}
