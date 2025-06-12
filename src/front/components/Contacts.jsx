import { useState } from "react";
import { Link } from "react-router-dom";
import { postNewContact } from "../service/contact.js";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Contacts = () => {
 
  return (
    <div className="container py-4">
       <h1>Contacts</h1>
   <div className="row">
    <button type="button" class="btn btn-primary">Add Contact</button>
   </div>
    </div>
    
  );



}
