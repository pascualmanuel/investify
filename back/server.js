const path = require("path");
const { spawn } = require("child_process");
const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
app.use(cors()); // Esto permite que cualquier origen acceda a la API

// Middleware para parsear JSON
app.use(express.json());

// Ruta de descarga
app.post("/download", (req, res) => {
  const url = req.body.url; // Suponiendo que la URL viene en el cuerpo de la petición

  console.log("Recibiendo URL:", url);

  // Ejecutamos el script Python usando spawn
  const pythonProcess = spawn("python3", ["downloader.py", url]);

  let videoPath = "";

  // Capturamos la salida estándar (stdout)
  pythonProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
    videoPath += data.toString(); // Guardar la ruta del archivo en la variable
  });

  // Capturamos los errores (stderr)
  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  // Al cerrar el proceso Python
  pythonProcess.on("close", (code) => {
    console.log(`Proceso Python terminó con código ${code}`);

    if (code === 0 && videoPath) {
      res.status(200).json({
        success: true,
        message: "Video descargado y convertido correctamente",
        videoUrl: `http://localhost:${port}/videos/${path.basename(
          videoPath.trim()
        )}`,
      });
    } else {
      res.status(500).json({
        success: false,
        message: `El proceso terminó con error (código ${code})`,
      });
    }
  });
});

// Servir los archivos de video desde una carpeta pública
app.use("/videos", express.static(path.join(__dirname, "video")));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
