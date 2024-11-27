// const WebSocket = require("ws");
// const ytDlp = require("yt-dlp");

// const wss = new WebSocket.Server({ port: 8080 });

// wss.on("connection", (ws) => {
//   console.log("Cliente WebSocket conectado");

//   function downloadVideo(url) {
//     const ydlOpts = {
//       format: "bestvideo+bestaudio/best",
//       quiet: true,
//       progress_hooks: [
//         (d) => {
//           if (d.status === "downloading") {
//             const progress = (d.downloaded_bytes / d.total_bytes) * 100;
//             ws.send(JSON.stringify({ progress }));
//           }
//         },
//       ],
//     };

//     const ydl = new ytDlp.YoutubeDL(url, ydlOpts);
//     ydl.download();
//   }

//   ws.on("message", (message) => {
//     const { url } = JSON.parse(message);
//     downloadVideo(url);
//   });

//   ws.on("close", () => {
//     console.log("Cliente WebSocket desconectado");
//   });
// });

// console.log("Servidor WebSocket activo en puerto 8080");
