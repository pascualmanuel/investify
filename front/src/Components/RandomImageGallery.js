import React, { useState, useEffect } from "react";

const RandomImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=2&limit=12")
      .then((response) => response.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        width: "750px",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "70px",
      }}
    >
      {images.map((image) => (
        <img
          key={image.id}
          src={image.download_url}
          alt={image.author}
          width={100}
          height={100}
        />
      ))}
    </div>
  );
};

export default RandomImageGallery;

// flex-direction: row;
// flex-wrap: wrap;
// justify-content: center;
