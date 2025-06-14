//importar
// 
// card con datos e imagen
//obtener los datos de la api (https://www.swapi.tech/api/people/1)


import React, { useEffect, useState } from "react";

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/people/")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleShowDetails = async (uid) => {
    if (details[uid]) {
      setDetails((prev) => {
        const newDetails = { ...prev };
        delete newDetails[uid];
        return newDetails;
      });
      return;
    }
    const res = await fetch(`https://www.swapi.tech/api/people/${uid}`);
    const data = await res.json();
    setDetails((prev) => ({
      ...prev,
      [uid]: data.result.properties,
    }));
  };

  if (loading) return <p>Cargando personajes...</p>;

  // Puedes cambiar esta URL por cualquier imagen que prefieras
  const getCharacterImage = (uid) =>
    `https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`;

  return (
    <div className="container py-4">
      <h2>Personajes de Star Wars</h2>
      <div className="row">
        {characters.map((character) => (
          <div className="col-md-4 mb-3" key={character.uid}>
            <div className="card h-100">
              <img
                src={getCharacterImage(character.uid)}
                alt={character.name}
                className="card-img-top"
                style={{ objectFit: "cover", height: "300px" }}
                onError={e => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"}
              />
              <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => handleShowDetails(character.uid)}
                >
                  {details[character.uid] ? "Ocultar detalles" : "Ver detalles"}
                </button>
                {details[character.uid] && (
                  <div className="mt-3">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Altura:</strong> {details[character.uid].height}
                      </li>
                      <li className="list-group-item">
                        <strong>Peso:</strong> {details[character.uid].mass}
                      </li>
                      <li className="list-group-item">
                        <strong>Color de cabello:</strong> {details[character.uid].hair_color}
                      </li>
                      <li className="list-group-item">
                        <strong>Color de piel:</strong> {details[character.uid].skin_color}
                      </li>
                      <li className="list-group-item">
                        <strong>Color de ojos:</strong> {details[character.uid].eye_color}
                      </li>
                      <li className="list-group-item">
                        <strong>Año de nacimiento:</strong> {details[character.uid].birth_year}
                      </li>
                      <li className="list-group-item">
                        <strong>Género:</strong> {details[character.uid].gender}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharactersList;