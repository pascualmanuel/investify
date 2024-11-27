import os
import yt_dlp
import subprocess
import sys
import random
import string

def generate_random_name(length=10):
    """Genera un nombre de archivo aleatorio."""
    return 'ytbvideo' + ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))

def download_video(url):
    video_dir = os.path.abspath('./video')  # Ruta absoluta para guardar los videos
    if not os.path.exists(video_dir):
        os.makedirs(video_dir)  # Asegura que el directorio exista

    random_name = generate_random_name()  # Genera un nombre aleatorio
    temp_file_path = os.path.join(video_dir, f"{random_name}.webm")  # Guarda como archivo temporal (máxima calidad)
    final_file_path = os.path.join(video_dir, f"{random_name}.mp4")  # Archivo final en MP4

    ydl_opts = {
        'format': 'bestvideo[ext=webm]+bestaudio[ext=webm]/best',  # Selecciona la mejor calidad disponible
        'outtmpl': temp_file_path,  # Guarda como archivo temporal
        'merge_output_format': 'webm',  # Formato temporal
        'noplaylist': True,  # Descarga solo un video
        'concurrent_fragment_downloads': 4,  # Descarga fragmentos en paralelo
        'noupdate': True,  # Evita consultar actualizaciones de metadatos

    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])  # Descarga el video
        print(f"Video descargado temporalmente: {temp_file_path}")

        # Convertir a MP4 con la calidad más alta
        result = subprocess.run(
    [
        'ffmpeg',
        '-i', temp_file_path,
        '-c:v', 'libx264',  # H.264
        '-preset', 'veryfast',  # Velocidad rápida
        '-crf', '29',  # Calidad razonable 23 es bastante alta
        '-c:a', 'aac',  # Audio AAC
        '-b:a', '128k',  # Calidad de audio más baja
        '-threads', '0',  # Usar múltiples hilos
        final_file_path
    ],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE
)

        if result.returncode != 0:
            print(f"Error al convertir a MP4: {result.stderr.decode()}")
            raise Exception(f"Error al convertir el video: {result.stderr.decode()}")

        print(f"Video convertido a MP4: {final_file_path}")
        
        # Elimina el archivo temporal .webm
        os.remove(temp_file_path)

        return final_file_path  # Retorna el archivo MP4 de alta calidad

    except Exception as e:
        print(f"Error durante la descarga o conversión: {e}")
        raise e

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("No se proporcionó la URL.")
        sys.exit(1)
    url = sys.argv[1]  # Recibe la URL desde los argumentos
    try:
        output_video_path = download_video(url)
        print(output_video_path)  # Imprime la ruta para que Node.js o la terminal la capture
    except Exception as e:
        print(f"Error: {e}")


