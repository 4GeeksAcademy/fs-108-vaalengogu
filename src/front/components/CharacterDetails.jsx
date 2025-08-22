import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FavoritesContext } from "./FavoritesContext.jsx";

export const CharacterDetails = () => {
  const { uid } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/people/${uid}`);
        const data = await res.json();
        setCharacter(data.result.properties);
      } catch (error) {
        console.error("Error al obtener personaje:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [uid]);

  if (loading) return <p className="text-center mt-5 text-white">Cargando...</p>;
  if (!character) return <p className="text-center mt-5 text-white">Personaje no encontrado</p>;

  const isFavorite = favorites.some(fav => fav.uid === uid);

  return (
    <div className="container py-5">
      <h2 className="text-warning mb-4">{character.name}</h2>
      <ul className="list-group mb-3">
        <li className="list-group-item">Altura: {character.height}</li>
        <li className="list-group-item">Peso: {character.mass}</li>
        <li className="list-group-item">Color de cabello: {character.hair_color}</li>
        <li className="list-group-item">Color de piel: {character.skin_color}</li>
        <li className="list-group-item">Color de ojos: {character.eye_color}</li>
        <li className="list-group-item">Año de nacimiento: {character.birth_year}</li>
        <li className="list-group-item">Género: {character.gender}</li>
      </ul>
      <button
        className={`btn ${isFavorite ? "btn-danger" : "btn-outline-danger"} me-2`}
        onClick={() => (isFavorite ? removeFavorite(uid) : addFavorite({ uid, type: "character", name: character.name }))}
      >
        <i className="fa-solid fa-heart"></i> {isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
      </button>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
};

export default CharacterDetails;


