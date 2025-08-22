import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const res = await fetch("https://www.swapi.tech/api/planets");
        const data = await res.json();

      
        const planetsWithDetails = await Promise.all(
          data.results.map(async (planet) => {
            const detailRes = await fetch(`https://www.swapi.tech/api/planets/${planet.uid}`);
            const detailData = await detailRes.json();
            return {
              uid: planet.uid,
              name: planet.name,
              properties: detailData.result.properties,
            };
          })
        );

        setPlanets(planetsWithDetails);
      } catch (error) {
        console.error("Error al obtener planetas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  if (loading) return <p className="text-center mt-5 text-white">Cargando planetas...</p>;

  return (
    <div className="container py-5">
      <h1 className="text-center text-warning mb-4">Planetas</h1>
      <div className="row g-4">
        {planets.map((planet) => {
          const desc = `Clima: ${planet.properties.climate}, Terreno: ${planet.properties.terrain}, Población: ${planet.properties.population}`;
          return (
            <div key={planet.uid} className="col-md-4">
              <div className="card h-100 shadow-sm bg-dark text-white border-secondary">
                <div className="card-body">
                  <h5 className="card-title">{planet.name}</h5>
                  <p className="card-text">{desc}</p>
                  <Link
                    to={`/planets/${planet.uid}`}
                    className="btn btn-primary me-2"
                  >
                    Ver detalles
                  </Link>
                  <button className="btn btn-outline-danger">
                    <i className="fa-solid fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Planets;
