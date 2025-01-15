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
