import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FavoritesContext } from "./FavoritesContext.jsx";

export const PlanetDetails = () => {
  const { uid } = useParams();
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/planets/${uid}`);
        const data = await res.json();
        const props = data.result.properties;
        const descripcion = `Clima: ${props.climate}, Terreno: ${props.terrain}, Población: ${props.population}`;
        setPlanet({ ...props, descripcion });
      } catch (error) {
        console.error("Error al obtener planeta:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanet();
  }, [uid]);

  if (loading) return <p className="text-center mt-5 text-white">Cargando...</p>;
  if (!planet) return <p className="text-center mt-5 text-white">Planeta no encontrado</p>;

  const isFavorite = favorites.some(fav => fav.uid === uid);

  return (
    <div className="container py-5">
      <h2 className="text-warning mb-4">{planet.name}</h2>
      <p>{planet.descripcion}</p>
      <button
        className={`btn ${isFavorite ? "btn-danger" : "btn-outline-danger"} me-2`}
        onClick={() => (isFavorite ? removeFavorite(uid) : addFavorite({ uid, type: "planet", name: planet.name }))}
      >
        <i className="fa-solid fa-heart"></i> {isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
      </button>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
};

export default PlanetDetails;
