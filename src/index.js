import reactDom from "react-dom";
import "./index.css";
import { AppRouter } from "./routers/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from 'redux-persist';

const persistor = persistStore(store);

reactDom.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
          <AppRouter />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
