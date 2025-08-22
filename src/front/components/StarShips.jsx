import React, { useState, useEffect, useContext } from "react";
import { FavoritesContext } from "./FavoritesContext.jsx";

const StarShips = () => {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    fetch("https://swapi.tech/api/starships/")
      .then((res) => res.json())
      .then((data) => setShips(data.results))
      .finally(() => setLoading(false));
  }, []);

  const isFavorite = (item) => favorites.some((fav) => fav.id === item.uid);

  if (loading) return <p className="text-center mt-5 text-white">Cargando naves...</p>;

  return (
    <div className="container py-5">
      <h1 className="text-center text-warning mb-4">StarShips</h1>
      <div className="row g-4">
        {ships.map((ship) => (
          <div key={ship.uid} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm bg-dark text-white border-secondary">
              <div className="card-body d-flex justify-content-between align-items-center">
                <h5>{ship.name}</h5>
                <button
                  className={`btn btn-sm ${isFavorite(ship) ? "btn-danger" : "btn-outline-danger"}`}
                  onClick={() => toggleFavorite({ id: ship.uid, name: ship.name, type: "StarShip" })}
                >
                  <i className="fa-solid fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarShips;
