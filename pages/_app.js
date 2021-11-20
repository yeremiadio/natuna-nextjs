import "tailwindcss/tailwind.css";
import "../styles/global.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { themeProvider } from "../utils/theme";

function MyApp({ Component, pageProps, router }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <React.Fragment>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <Layout>
            <ChakraProvider theme={themeProvider}>
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.route} />
              </AnimatePresence>
            </ChakraProvider>
          </Layout>
        </React.Fragment>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
