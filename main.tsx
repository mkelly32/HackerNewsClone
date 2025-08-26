import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./src/app";
import "./styles.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
