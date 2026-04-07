import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./layout/App";
import { Provider } from "react-redux";
import { appStore } from "./store/appStore";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={appStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
