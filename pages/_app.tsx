//tsx == type script jsx file.
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

//In a typescript file, functions are slightly different we have to specify what kind/type of props we passing to each and every component
//In this case, these props are of a type AppProps predefined by next/app
//for other component we are defining our own type.
const MyApp = ({ Component, pageProps }: AppProps) => {
  //In order to let our Next.js app run on backend and frontend correctly:
  const [isSSR, setIsSSR] = useState(true); //at the start each page/component we assume to be server side render
  useEffect(() => {
    setIsSSR(false);
  }, []);
  //but when it is not SSR, this useEFffect only runs at the start of a page/component (b/c [])
  //if we come to this useEfffect that means the code of page/component is being executed inside of React (which is Client side)

  if (isSSR) return null; //if we're SSR then we don't want to show our components

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
        <Navbar />
        <div className="flex gap-6 md:gap-20">
          <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
            <Sidebar />
          </div>
          <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
