import "tailwindcss/tailwind.css";
import "../styles/global.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store";
import React from "react";
import {
  ChakraProvider,
  extendTheme,
  theme as chakraTheme,
} from "@chakra-ui/react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";

const tailwind = resolveConfig(tailwindConfig);

chakraTheme.colors = tailwind.theme.colors;

const themeProvider = extendTheme({
  components: { Button: { baseStyle: { _focus: { boxShadow: "none" } } } },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  colors: {
    ...chakraTheme.colors,
    green: {
      ...chakraTheme.colors.green,
    },
    red: {
      ...chakraTheme.colors.red,
    },
    blue: {
      ...chakraTheme.colors.blue,
    },
  },
  radii: {
    none: "0",
    sm: "0.3rem",
    base: "0.3rem",
    md: "0.3rem",
    lg: "0.3rem",
    xl: "0.3rem",
    "2xl": "0.3rem",
    "3xl": "0.3rem",
    full: "0.3rem",
  },
});

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <React.Fragment>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Natuna</title>
          <Layout>
            <ChakraProvider theme={themeProvider}>
              <Component {...pageProps} />
            </ChakraProvider>
          </Layout>
        </React.Fragment>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
