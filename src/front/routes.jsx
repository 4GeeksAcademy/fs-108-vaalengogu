import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Character from "./components/Character.jsx";
import CharacterDetails from "./components/CharacterDetails.jsx";
import Planets from "./components/Planets.jsx";
import PlanetDetails from "./components/PlanetDetails.jsx";
import StarShips from "./components/StarShips.jsx";
import StarshipDetails from "./components/StarshipDetails.jsx";
import Contacts from "./components/Contacts.jsx";
import AddContact from "./components/AddContact.jsx";
import ContactDetails from "./components/ContactDetails.jsx";
import Favorites from "./components/Favorites.jsx";


const NotFound = () => <h1 className="text-center text-warning mt-5">404 - Página no encontrada</h1>;

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFound />}>
      <Route index element={<Home />} />
      <Route path="character" element={<Character />} />
      <Route path="character/:uid" element={<CharacterDetails />} />
      <Route path="planets" element={<Planets />} />
      <Route path="planets/:uid" element={<PlanetDetails />} />
      <Route path="starships" element={<StarShips />} />
      <Route path="starships/:uid" element={<StarshipDetails />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="contacts/:id" element={<ContactDetails />} />
      <Route path="add-contact" element={<AddContact />} />
      <Route path="favorites" element={<Favorites />} />
    </Route>
  )
);
