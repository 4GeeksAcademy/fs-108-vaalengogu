import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ContactsContext } from "./ContactsContext.jsx";

const ContactDetails = () => {
  const { id } = useParams();
  const { contacts } = useContext(ContactsContext);
  const contact = contacts.find((c) => c.id === parseInt(id));

  if (!contact) return <p className="text-center mt-5">Contacto no encontrado</p>;

  return (
    <div className="container py-5">
      <h1 className="text-warning">Detalles de {contact.name}</h1>
      <p className="bg-dark text-white p-3 rounded"><strong>Email:</strong> {contact.email}</p>
      <Link to="/contacts" className="btn btn-secondary">Volver</Link>
    </div>
  );
};

export default ContactDetails;
