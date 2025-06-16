import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addContact } from "../service/contact.js"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const AddContact = () => {
    const { store, dispatch } = useGlobalReducer()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newContact = { name, email, phone, address };
        await addContact(newContact);
        navigate("/contacts");
    };

    useEffect(() => {
        if (store.isEdit) {
            //tengo que ponerle a todos los [] los valores que tengo 
            const contacto = store.currentContact;
            if (contacto) {
                setName(contacto.name);
                setPhone(contacto.phone);
                setEmail(contacto.email);
                setAddress(contacto.address);
            }
        }
    }, [])

    return (
        <div className="container py-4">
            <h2>{store.isEdit ? "Editar perfil" : "Agregar contacto" } </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success">
                    Guardar
                </button>
            </form>
        </div>
    );
};


