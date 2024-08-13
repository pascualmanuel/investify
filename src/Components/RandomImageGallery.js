import React, { useState, useEffect } from "react";

const RandomImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=2&limit=4")
      .then((response) => response.json())
      .then((data) => setImages(data));
  }, []);

  return <div style={{ display: "flex", gap: "10px" }}></div>;
};

export default RandomImageGallery;
