import { useState } from "react";
import { Link } from "react-router-dom";
import { postNewContact } from "../services/contact.js";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const AddNewContact = () => {
  const { dispatch } = useGlobalReducer();
  const userName = "valentina";
  const host = `https://playground.4geeks.com/contact/agendas`;
  const getUrl = `${host}/${userName}`;
  const postUrlUser = `${host}/${userName}`;
  const postUrlContacts = `${host}/${userName}/contacts`;

  const [contactName, setContactName] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactAddress, setContactAddress] = useState("");
  const [contacts, setContacts] = useState([]);

  const handleFullName = (event) => setContactName(event.target.value);
  const handlePhone = (event) => setContactPhoneNumber(event.target.value);
  const handleEmail = (event) => setContactEmail(event.target.value);
  const handleAddress = (event) => setContactAddress(event.target.value);

  const addUser = async () => {
    try {
      const checkUser = await fetch(getUrl);
      if (checkUser.status === 404) {
        const createUser = await fetch(getUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!createUser.ok) {
          console.error("Error al crear el usuario");
        }
      }
    } catch (error) {
      console.error("Error al verificar el usuario", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      full_name: contactName,
      phone: contactPhoneNumber,
      email: contactEmail,
      address: contactAddress,
      agenda_slug: userName,
    };

    if (
      !contactName.trim() &&
      !contactPhoneNumber.trim() &&
      !contactEmail.trim() &&
      !contactAddress.trim()
    ) {
      setContactName("");
      setContactPhoneNumber("");
      setContactEmail("");
      setContactAddress("");
      return;
    }

    try {
      await addUser();
      const contactList = await postNewContact(userData);
      if (contactList) {
        dispatch({ type: "SET_CONTACTS", payload: contactList }); // Ajusta el tipo si tienes definido otro
      }
      setContactName("");
      setContactPhoneNumber("");
      setContactEmail("");
      setContactAddress("");
    } catch (error) {
      console.error("Error en el formulario", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nombre" value={contactName} onChange={handleFullName} />
      <input type="text" placeholder="Teléfono" value={contactPhoneNumber} onChange={handlePhone} />
      <input type="email" placeholder="Correo" value={contactEmail} onChange={handleEmail} />
      <input type="text" placeholder="Dirección" value={contactAddress} onChange={handleAddress} />
      <button type="submit">Agregar contacto</button>
      <Link to="/">Volver</Link>
    </form>
  );
};
