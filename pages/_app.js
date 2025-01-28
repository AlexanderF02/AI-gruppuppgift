import "@/styles/globals.css";
import DaisyHeader from "@/components/DaisyHeader";
import Footer from "@/components/Footer";
import { Funnel_Display, Funnel_Sans } from "next/font/google";

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-funnelDisplay",
});

const funnelSans = Funnel_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-funnelSans",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <main className={`${funnelSans.variable} font-sans`}>
        <div className={`${funnelDisplay.variable} font-display`}>
          <DaisyHeader />
          <Component {...pageProps} />
          <Footer />
        </div>
      </main>
    </>
  );
}
