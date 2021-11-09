import "tailwindcss/tailwind.css";
import "../styles/global.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store";
import React from "react";

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
            <Component {...pageProps} />
          </Layout>
        </React.Fragment>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
