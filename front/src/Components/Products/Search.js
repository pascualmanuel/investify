import "./Product.css";
import Seatch from "./Search";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Lupita } from "../../Assets/lupita.svg";

const Search = () => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [newData, setNewData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const dataArray = [
      { name: "Heladeras", id: "heladeras", description: "soy el mejor micro" },
      { name: "Microondas", id: "microondas" },
      { name: "Hornos eléctricos", id: "hornos" },
      { name: "Lavadoras / Secadoras", id: "lavadoras" },
      { name: "Freezer", id: "freezers" },
    ];
    setNewData(dataArray);
  }, []);


  return (
    <>
      <div className="form-container" ref={searchDiv}>
        <div className="input-cont">
          <input
            placeholder="Type to search..."
            value={searchTerm}
            onChange={handleSearch}
            type="text"
          />
        </div>

        {searchTerm.length > 0 && <></>}
      </div>
    </>
  );
};
export default Search;
