import React from "react";

function Categories() {
  return (
    <>
      <div className="background-categories">
        <div className="categories-container max-2000">
          <div className="categories-left-container">
            <p style={{ marginBottom: "15px" }}>¿Cómo podemos ayudarte hoy?</p>
            <h2>
              <span style={{ color: "#5d80ff" }}> Cuatro </span>
              categorías, <br></br> todas las soluciones.
            </h2>
            <p style={{ marginTop: "10px" }}>
              Encuentra a los Expertos más
              <br className="br-right-p-categories" /> recomendados para tu
              hogar, <br className="br-right-p-categories" /> clases o
              tecnología.
            </p>
          </div>
          <div className="categories-right-container">
            <div className="box-container">
              <div className="box">
                <img
                  src={ArreglatodoIcon}
                  alt="Icono Arreglatodo"
                  width={65}
                  style={{
                    marginLeft: "17px",
                    marginTop: "15px",
                    marginBottom: "10px",
                  }}
                />
                <h2 style={{ marginLeft: "20px", fontSize: "24px" }}>
                  Arreglatodo
                </h2>
                <p
                  style={{
                    marginLeft: "20px",
                    marginTop: "8px",
                    marginRight: "20px",
                  }}
                >
                  Elige tu Handyman para esas pequeñas tareas de rápida
                  solución.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;
