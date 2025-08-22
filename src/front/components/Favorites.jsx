import React, { useContext } from "react";
import { FavoritesContext } from "./FavoritesContext.jsx";

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div className="container py-5">
      <h1 className="text-center text-warning mb-4">Favoritos</h1>
      <div className="row g-4">
        {favorites.map((item) => (
          <div key={item.id + item.type} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm bg-dark text-white border-secondary">
              <div className="card-body d-flex justify-content-between align-items-center">
                <h5>{item.name}</h5>
                <span className="badge bg-info">{item.type}</span>
                <button className="btn btn-sm btn-danger" onClick={() => removeFavorite(item.id, item.type)}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
        {favorites.length === 0 && <p className="text-white text-center">No hay favoritos aún.</p>}
      </div>
    </div>
  );
};

export default Favorites;
