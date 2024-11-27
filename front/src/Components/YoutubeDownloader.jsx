import React, { useState, useEffect } from "react";
import "../Styles/VideoDownloader.css"; // Importamos el archivo de estilos

const VideoDownloader = () => {
  const [url, setUrl] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0); // Estado para la barra de progreso

  const handleDownload = async () => {
    // Validar si la URL contiene 'youtube'
    if (!url.includes("youtube.com/")) {
      setError("Por favor ingresa una URL válida");
      return;
    }

    if (!url) {
      setError("Por favor ingresa una URL.");
      return;
    }

    setIsDownloading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:4000/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data.success) {
        setDownloadLink(data.videoUrl); // Aquí deberías devolver la URL del video
      } else {
        setError("Hubo un error al procesar la descarga.");
      }
    } catch (err) {
      setError("Error al conectar con el servidor.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDirectDownload = async () => {
    if (downloadLink) {
      try {
        const response = await fetch(downloadLink);
        const blob = await response.blob(); // Convertir la URL a un blob
        const url = window.URL.createObjectURL(blob); // Crear una URL temporal para el archivo
        const a = document.createElement("a"); // Crear un enlace programático
        a.href = url;
        a.download = downloadLink.split("/").pop(); // Establecer el nombre del archivo
        a.click(); // Simular el clic para descargar el archivo
        window.URL.revokeObjectURL(url); // Revocar la URL una vez descargado
      } catch (err) {
        setError("Hubo un error al intentar descargar el archivo.");
      }
    }
  };

  return (
    <div className="yt-container">
      <h2 className="yt-title">Descargar Video de YouTube</h2>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Ingresa la URL del video"
        className="yt-input"
      />
      <button
        onClick={handleDownload}
        // disabled={isDownloading || !url.includes("youtube")}
        className="yt-button"
      >
        {isDownloading ? "Descargando..." : "Descargar"}
      </button>

      {error && <p className="yt-error">{error}</p>}

      {isDownloading && (
        <div className="yt-progress-container">
          <p>Progreso: {Math.round(progress)}%</p>
          <div className="yt-progress">
            <div
              className="yt-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {downloadLink && (
        <div>
          <p>Video listo para descargar:</p>
          <button onClick={handleDirectDownload} className="yt-download-link">
            Haz clic aquí para descargar
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoDownloader;
