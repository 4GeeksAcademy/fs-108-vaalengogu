import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addContact, getContact } from "../service/contact.js";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import pingui from "../assets/img/pingui.jpg";


export const Contacts = () => {
  const { store, dispatch } = useGlobalReducer()



  const handleDelete = (id) =>{
 //llamar a la funcion del fetch delete que esta en el contact.js (aun no creada)
 // llamo a la funcion getcontact que tengo en .js y se lo asigno a una constante (data)
 // con lo que tengo en data tengo que ejecutar el dispach para actualizar el store
 //
  }

  useEffect(() => {
    const get = async () => {
      const data = await getContact()
      dispatch({ type: 'contacts', payload: data })
    }
    get()
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

                <span className="mx-3" >
                  <i className="fa-solid fa-pen-to-square fa-2xl text-primary"></i>
                </span>
                <span onClick={ () => handleDelete(item.id)}>
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
