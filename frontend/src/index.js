import React from "react";
import { createRoot } from "react-dom/client"; // Use createRoot from react-dom/client
import App from "./App";
import { BrowserRouter } from "react-router-dom";
const container = document.getElementById("root");
const root = createRoot(container); // Create the root
//Hi Im Shapar
root.render(
  // <BrowserRouter>
  <div>
    <App />
  </div>
  // </BrowserRouter>
);
