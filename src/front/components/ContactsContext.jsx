import { createContext, useState } from "react";

export const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const addContact = (contact) => setContacts([...contacts, contact]);

  const editContact = (id, updatedContact) =>
    setContacts(contacts.map((c) => (c.id === id ? updatedContact : c)));

  const deleteContact = (id) => setContacts(contacts.filter((c) => c.id !== id));

  return (
    <ContactsContext.Provider value={{ contacts, addContact, editContact, deleteContact }}>
      {children}
    </ContactsContext.Provider>
  );
};

