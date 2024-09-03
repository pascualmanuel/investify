import React, { useState, useEffect } from "react";

const Friends = () => {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAscending, setSortAscending] = useState(true);

  // Fetch data from following.json
  useEffect(() => {
    fetch("../Assets/following.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching the JSON data:", error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  // Extracting values from JSON data
  const values = data.relationships_following.flatMap((item) =>
    item.string_list_data.map((data) => data.value)
  );

  // Handle search input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Sort and filter values
  const filteredValues = values
    .filter((value) => value.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (sortAscending ? a.localeCompare(b) : b.localeCompare(a)));

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={() => setSortAscending(!sortAscending)}>
        Sort {sortAscending ? "Descending" : "Ascending"}
      </button>
      <ul>
        {filteredValues.map((value, index) => (
          <li key={index}>
            <a
              href={`https://www.instagram.com/${value}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
