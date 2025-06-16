import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addContact, getContact, deleteContact } from "../service/contact.js";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import pingui from "../assets/img/pingui.jpg";



export const Contacts = () => {
  const { store, dispatch } = useGlobalReducer()
  const navigate = useNavigate()



  const handleEdit = async (item) => {

    dispatch({ type: "currentContact", payload: item });
    dispatch({ type: "isEdit", payload: true })

    navigate("/add-contact")
  };



  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este contacto?");
      if (!confirmDelete) return;

      const result = await deleteContact(id);

      if (result) {
        console.log("Contacto eliminado correctamente");
        const updatedContacts = await getContact();
        dispatch({ type: "contacts", payload: updatedContacts });
      } else {
        console.warn("No se pudo eliminar el contacto");
      }

    } catch (error) {
      console.error("Error al eliminar el contacto:", error);
    }
  };

  useEffect(() => {
    const get = async () => {
      const data = await getContact()
      dispatch({ type: 'contacts', payload: data })
    }
    get()
    dispatch ({ type: "currentContact", payload: {}})
    dispatch ({ type: "isEdit", payload: false})
  }, [])

  return (
    <div className="container py-4">
      <h1>Contacts</h1>
      <div className="row mb-3">
        <Link to="/add-contact" className="btn btn-primary">
          Add Contact
        </Link>
      </div>

      <div className="row mb-3">
        {store.contacts.map((item) =>

          <div key={item.id} className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={pingui} className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.phone}</p>
                  <p className="card-text">{item.email}</p>
                  <p className="card-text">{item.address}</p>
                </div>
              </div>
              <div className="col-md-2 mt-3" >

                <span onClick={() => handleEdit(item)} className="mx-3" >
                  <i className="fa-solid fa-pen-to-square fa-2xl text-primary"></i>
                </span>
                <span onClick={() => handleDelete(item.id)}>
                  <i className="fa-solid fa-trash fa-2xl text-danger" ></i>
                </span>
              </div>

            </div>
          </div>

        )}

      </div>

    </div>
  );
};
