import React, { useState, useEffect } from "react";

const RandomImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://picsum.photos/id/870/200/300?grayscale&blur=2")
      .then((response) => response.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
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
