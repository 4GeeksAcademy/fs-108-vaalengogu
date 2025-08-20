import React from "react";

const movies = [
  { title: "Star Wars: A New Hope (1977)", videoId: "vZ734NWnAHA" },
  { title: "The Empire Strikes Back (1980)", videoId: "JNwNXF9Y6kY" },
  { title: "Return of the Jedi (1983)", videoId: "7L8p7_SLzvU" },
  { title: "The Phantom Menace (1999)", videoId: "bD7bpG-zDJQ" },
  { title: "Attack of the Clones (2002)", videoId: "gYbW1F_c9eM" },
  { title: "Revenge of the Sith (2005)", videoId: "5UnjrG_N8hU" },
  { title: "The Force Awakens (2015)", videoId: "sGbxmsDFVnE" },
  { title: "The Last Jedi (2017)", videoId: "Q0CbN8sfihY" },
  { title: "The Rise of Skywalker (2019)", videoId: "8Qn_spdM5Zg" },
];

export const Home = () => {
  return (
    <div className="min-vh-100 bg-dark text-white p-4">
      <h1 className="text-center text-warning mb-4"> Star Wars Movies</h1>

      {/* Carrusel centrado y al 50% */}
      <div id="carouselExample" className="carousel slide w-50 mx-auto">
        <div className="carousel-inner">
          {movies.map((movie, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <iframe
                className="d-block w-100"
                src={`https://www.youtube.com/embed/${movie.videoId}`}
                title={movie.title}
                style={{ height: "300px", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <div className="carousel-caption d-none d-md-block">
                <h5>{movie.title}</h5>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
