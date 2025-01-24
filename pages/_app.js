import "@/styles/globals.css";
import Header from "@/components/header";
import DaisyHeader from "@/components/DaisyHeader";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <DaisyHeader />
      <Component {...pageProps} />;
      <Footer />
    </>
  );
}
