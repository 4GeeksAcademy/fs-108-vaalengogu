import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.jsx";
import { FavoritesProvider } from "./components/FavoritesContext.jsx";
import { ContactsProvider } from "./components/ContactsContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FavoritesProvider>
      <ContactsProvider>
        <RouterProvider router={router} />
      </ContactsProvider>
    </FavoritesProvider>
  </React.StrictMode>
);

