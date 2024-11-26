import os
import yt_dlp
import subprocess
import sys

def download_video(url):
    video_dir = os.path.abspath('./video')  # Obtiene la ruta absoluta
    if not os.path.exists(video_dir):
        os.makedirs(video_dir)  # Asegura que el directorio exista

    ydl_opts = {
        'format': 'bestvideo+bestaudio/best',
        'outtmpl': os.path.join(video_dir, '%(title)s.%(ext)s'),  # Ruta absoluta
        'merge_output_format': 'webm',  # Guarda como .webm
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(url, download=True)
        video_title = info_dict.get('title', None)
        file_path = os.path.join(video_dir, f"{video_title}.webm")

        print(f"Video descargado: {file_path}")
        
        # Convertir a mp4 para el cliente
        output_mp4 = os.path.join(video_dir, f"{video_title}.mp4")
        result = subprocess.run(['ffmpeg', '-i', file_path, output_mp4], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        if result.returncode != 0:
            print(f"Error al convertir a MP4: {result.stderr.decode()}")
            raise Exception(f"Error al convertir el video: {result.stderr.decode()}")

        print(f"Video convertido a MP4: {output_mp4}")
        
        return output_mp4  # Retorna la ruta absoluta del archivo mp4

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("No se proporcionó la URL.")
        sys.exit(1)
    url = sys.argv[1]  # Recibe la URL desde los argumentos
    output_video_path = download_video(url)
    print(output_video_path)  # Imprime la ruta para que Node.js la capture
