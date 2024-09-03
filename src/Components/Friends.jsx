import React, { useState, useEffect } from "react";

const Friends = () => {
  const [followingData, setFollowingData] = useState([]);
  const [followersData, setFollowersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch following data
        const followingResponse = await fetch("/following.json");
        if (!followingResponse.ok) {
          throw new Error(
            `Failed to fetch following.json: ${followingResponse.statusText}`
          );
        }
        const following = await followingResponse.json();

        // Fetch followers data
        const followersResponse = await fetch("/followers.json");
        if (!followersResponse.ok) {
          throw new Error(
            `Failed to fetch followers.json: ${followersResponse.statusText}`
          );
        }
        const followers = await followersResponse.json();

        // Extract values from each JSON file
        const followingValues = following.relationships_following.flatMap(
          (item) => item.string_list_data?.map((data) => data.value) || []
        );

        const followersValues = followers.flatMap(
          (item) => item.string_list_data?.map((data) => data.value) || []
        );

        // Log values to verify correct data is being fetched
        console.log("Following Values:", followingValues);
        console.log("Followers Values:", followersValues);

        setFollowingData(followingValues);
        setFollowersData(followersValues);
      } catch (error) {
        console.error("Error fetching the JSON data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter values to show those in following but not in followers
  const notInFollowers = followingData
    .filter((value) => !followersData.includes(value)) // Ensure filtering out followers
    .filter((value) => value.toLowerCase().includes(searchTerm.toLowerCase())) // Apply search filter
    .sort((a, b) => (sortAscending ? a.localeCompare(b) : b.localeCompare(a))); // Apply sorting

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setSortAscending(!sortAscending)}>
        Sort {sortAscending ? "Descending" : "Ascending"}
      </button>

      <h2>Following but Not Followers</h2>
      <ul>
        {notInFollowers.length === 0 ? (
          <li>No entries in Following but not in Followers.</li>
        ) : (
          notInFollowers.map((value, index) => (
            <li key={index}>
              <a
                href={`https://www.instagram.com/${value}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {value}
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Friends;
