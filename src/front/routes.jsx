import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout.jsx";
import { Home } from "./pages/Home.jsx";
import { Character } from "./components/Character.jsx";
import { Planets } from "./components/Planets.jsx";
import { StarShips } from "./components/StarShips.jsx";
import { Contacts } from "./components/Contacts.jsx";
import Favorites from "./components/Favorites.jsx";
import {AddContact} from "./components/AddContact.jsx";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route path="/" element={<Home />} />
      <Route path="/character" element={<Character />} />
      <Route path="/planets" element={<Planets />} />
      <Route path="/starships" element={<StarShips />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/add-contact" element={<AddContact />} />

    </Route>
  )
);
