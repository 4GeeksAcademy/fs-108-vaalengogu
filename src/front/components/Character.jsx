import {
  useState, useEffect
} from "react"


export const Character = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCharacters = async () => {
    try {
      const res = await fetch("https://swapi.tech/api/people/");
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
            ///boton que sea ver detalles
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


