import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FavoritesContext } from "./FavoritesContext.jsx";

export const StarshipDetails = () => {
  const { uid } = useParams();
  const [starship, setStarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchStarship = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/starships/${uid}`);
        const data = await res.json();
        const props = data.result.properties;
        const descripcion = `Modelo: ${props.model}, Manufactura: ${props.manufacturer}, Velocidad máxima: ${props.max_atmosphering_speed}`;
        setStarship({ ...props, descripcion });
      } catch (error) {
        console.error("Error al obtener nave:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStarship();
  }, [uid]);

  if (loading) return <p className="text-center mt-5 text-white">Cargando...</p>;
  if (!starship) return <p className="text-center mt-5 text-white">Nave no encontrada</p>;

  const isFavorite = favorites.some(fav => fav.uid === uid);

  return (
    <div className="container py-5">
      <h2 className="text-warning mb-4">{starship.name}</h2>
      <p>{starship.descripcion}</p>
      <button
        className={`btn ${isFavorite ? "btn-danger" : "btn-outline-danger"} me-2`}
        onClick={() => (isFavorite ? removeFavorite(uid) : addFavorite({ uid, type: "starship", name: starship.name }))}
      >
        <i className="fa-solid fa-heart"></i> {isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
      </button>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
};

export default StarshipDetails;
