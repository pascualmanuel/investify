import React, { useState, useEffect } from "react";

const VideoDownloader = () => {
  const [url, setUrl] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0); // Estado para la barra de progreso

  useEffect(() => {
    // Crear WebSocket para recibir el progreso
    const ws = new WebSocket("ws://localhost:8081");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.progress) {
        setProgress(data.progress); // Actualizar el progreso
      }
    };

    return () => {
      ws.close(); // Cerrar WebSocket cuando el componente se desmonte
    };
  }, []);

  const handleDownload = async () => {
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

  console.log(progress);

  return (
    <div>
      <h2>Descargar Video de YouTube</h2>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Ingresa la URL del video"
      />
      <button onClick={handleDownload} disabled={isDownloading}>
        {isDownloading ? "Descargando..." : "Descargar"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {isDownloading && (
        <div>
          <p>Progreso: {Math.round(progress)}%</p>
          <progress value={progress} max="100" />
        </div>
      )}

      {downloadLink && (
        <div>
          <p>Video listo para descargar:</p>
          <a href={downloadLink} download>
            Haz clic aquí para descargar
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoDownloader;
