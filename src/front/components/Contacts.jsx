import React, { useContext, useState } from "react";
import { ContactsContext } from "./ContactsContext.jsx";

const Contacts = () => {
  const { contacts, addContact, editContact, deleteContact } = useContext(ContactsContext);
  const [newContact, setNewContact] = useState({ id: "", name: "", email: "" });

  const handleAdd = () => {
    if (!newContact.name || !newContact.email) return;
    addContact({ ...newContact, id: Date.now().toString() });
    setNewContact({ id: "", name: "", email: "" });
  };

  return (
    <div className="container py-5">
      <h1 className="text-center text-warning mb-4">Contacts</h1>
      <div className="mb-4 d-flex gap-2">
        <input
          type="text"
          placeholder="Nombre"
          className="form-control"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="form-control"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          Añadir
        </button>
      </div>
      <div className="row g-3">
        {contacts.map((c) => (
          <div key={c.id} className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm bg-dark text-white border-secondary">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5>{c.name}</h5>
                <p>{c.email}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-sm btn-warning" onClick={() => editContact(c.id, { ...c, name: prompt("Nuevo nombre:", c.name) || c.name })}>
                    Editar
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteContact(c.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
