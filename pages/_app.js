import "../styles/globals.css";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import Sidebar from "../components/Sidebar";
import SidebarMobile from "../components/SidebarMobile";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AnimatePresence } from "framer-motion";
import CoffeeCup from "../components/icons/coffeecup";
import { auth } from "../lib/firebase";
import { Provider } from "react-redux";
import store from "../redux/store";

function MyApp({ Component, pageProps }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [uid, setUid] = useState(null);
  // Google analytics
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        let uid = user.uid;
        setUid(uid);
        // ...
      } else {
        // User is signed out
        // ...
        setUid(null)
      }
    });
  }, []);

  return (
    <Provider store={store}>

    <div className="relative flex flex-col">
      <div className="bg-overlay" />
      <div className="relative flex flex-col mx-6 lg:mx-0 min-h-screen">
        <Navbar openMenu={() => setIsMenuOpen(!isMenuOpen)} />
        <main className="grid grid-cols-1 lg:grid-cols-3 flex-grow">
          <Sidebar uid={uid} />
          {isMenuOpen && (
            <SidebarMobile uid={uid} closeMenu={() => setIsMenuOpen(false)} />
            )}
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} />
          </AnimatePresence>
        </main>
        <Footer />
        <a
          href="https://www.buymeacoffee.com/rocktimcodes"
          target="_blank"
          className="fixed left-5 bottom-6"
          >
          <CoffeeCup />
        </a>
      </div>
    </div>
          </Provider>
  );
}

export default MyApp;
