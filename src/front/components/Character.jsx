import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "./FavoritesContext.jsx";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    fetch("https://swapi.tech/api/people/")
      .then((res) => res.json())
      .then((data) => setCharacters(data.results))
      .finally(() => setLoading(false));
  }, []);

  const isFavorite = (item) => favorites.some((fav) => fav.id === item.uid);

  if (loading) return <p className="text-center mt-5 text-white">Cargando personajes...</p>;

  return (
    <div className="container py-5">
      <h1 className="text-center text-warning mb-4">Personajes</h1>
      <div className="row g-4">
        {characters.map((char) => (
          <div key={char.uid} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm bg-dark text-white border-secondary">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{char.name}</h5>
                <div className="d-flex justify-content-between mt-3">
                  <Link to={`/character/${char.uid}`} className="btn btn-sm btn-primary">
                    Ver detalles
                  </Link>
                  <button
                    className={`btn btn-sm ${isFavorite(char) ? "btn-danger" : "btn-outline-danger"}`}
                    onClick={() => toggleFavorite({ id: char.uid, name: char.name, type: "Character" })}
                  >
                    <i className="fa-solid fa-heart"></i>
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

export default Characters;
