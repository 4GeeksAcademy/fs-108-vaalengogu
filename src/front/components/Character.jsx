export const Character = ()=> {
    return (
        <div className="container">
            <h1>Character</h1>
        </div>
    )
}
import React, { useEffect, useState } from "react";

const CharacterGallery = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCharacters = async () => {
    try {
      const res = await fetch("https://swapi.dev/api/people/");
      const data = await res.json();
      setCharacters(data.results);
    } catch (error) {
      console.error("Error al obtener personajes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div className="character-gallery">
      {loading ? (
        <p>Cargando personajes...</p>
      ) : (
        <div className="grid">
          {characters.map((character, index) => (
            <div className="card" key={index}>
              <h3>{character.name}</h3>
              <p><strong>Altura:</strong> {character.height} cm</p>
              <p><strong>Género:</strong> {character.gender}</p>
              <p><strong>Nacimiento:</strong> {character.birth_year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterGallery;
