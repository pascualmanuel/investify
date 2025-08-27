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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = newData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = () => {
    setSearchTerm("");
  };

  const searchDiv = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchDiv.current && !searchDiv.current.contains(event.target)) {
        handleClick();
      }
    }
    function handleEscape(event) {
      if (event.key === "Escape") {
        handleClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [searchDiv]);

  if (searchTerm.length > 0) {
    console.log(searchTerm);
  }

  console.log(filteredData);

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
          {searchTerm.length < 1 && (
            <button variant="outline-success" className="btn-search">
              <div>
                <Lupita width={20} style={{ fill: "white" }} />
              </div>
            </button>
          )}
        </div>

        {searchTerm.length > 0 && (
          <div className="probando">
            {filteredData.map((item) => (
              <>
                <Link to={`/${item.id}`}>
                  <div className="search-product" onClick={handleClick}>
                    <p>
                      <p key={item.id} className="p-search">
                        {item.name}
                      </p>
                    </p>
                  </div>
                </Link>
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default Search;
