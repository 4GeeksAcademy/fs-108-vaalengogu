import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContactsContext } from "./ContactsContext.jsx";

const AddContact = () => {
  const { addContact } = useContext(ContactsContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addContact({ id: Date.now(), name, email });
    navigate("/contacts");
  };

  return (
    <div className="container py-5">
      <h1 className="text-warning mb-4">Añadir Contacto</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
};

export default AddContact;
