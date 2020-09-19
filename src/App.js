import React from "react";
import { Provider } from "react-redux";
import { store } from "./stores.js";
import { PersistGate } from "redux-persist/integration/react";
import { Test } from "./test";

import { RootComponent } from "./route";
const App = () => {
  return (
    <>
      <Provider store={store}>
        <RootComponent />
      </Provider>
    </>
  );
};

export default App;
