import React from "react";
import tatooine from "../../assets/img/tatooine.jpg";
import alderaan from "../../assets/img/alderaan.jpg";
import hoth from "../../assets/img/hoth.jpg";
import dagobah from "../../assets/img/dagobah.jpg";
import endor from "../../assets/img/endor.jpg";

const planets = [
  {
    name: "Tatooine",
    image: tatooine,
    description: "Un planeta desértico, hogar de Luke Skywalker y Anakin Skywalker.",
  },
  {
    name: "Alderaan",
    image: alderaan,
    description: "Un planeta pacífico destruido por la Estrella de la Muerte.",
  },
  {
    name: "Hoth",
    image: hoth,
    description: "Un planeta helado, ubicación de la Base Eco de la Alianza Rebelde.",
  },
  {
    name: "Dagobah",
    image: dagobah,
    description: "Un planeta pantanoso donde Yoda se exilió.",
  },
  {
    name: "Endor",
    image: endor,
    description: "Una luna boscosa, hogar de los Ewoks.",
  },
];

export const Planets = () => {
  return (
    <div
      className="container py-5"
      style={{ backgroundColor: "#0b0b0b", minHeight: "100vh" }}
    >
      <h1 className="text-center mb-5 text-warning">Planetas</h1>
      <div className="row g-4">
        {planets.map((planet, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm bg-dark text-white border-secondary hover-card">
              <img
                src={planet.image}
                className="card-img-top"
                alt={planet.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{planet.name}</h5>
                <p className="card-text">{planet.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .hover-card {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .hover-card:hover {
          transform: scale(1.05);
          box-shadow: 0 0.5rem 1rem rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Planets;
