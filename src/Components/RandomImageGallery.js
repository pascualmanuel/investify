import React, { useState, useEffect } from 'react';

const RandomImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('')
      .then((response) => response.json())
      .then((data) => setImages(data));
  }, []);


};

export default RandomImageGallery;
