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
    video_dir = os.path.abspath('./video')  # Obtiene la ruta absoluta
    if not os.path.exists(video_dir):
        os.makedirs(video_dir)  # Asegura que el directorio exista

    random_name = generate_random_name()  # Genera un nombre aleatorio
    temp_file_path = os.path.join(video_dir, f"{random_name}.webm")  # Nombre temporal para evitar conflictos
    final_file_path = os.path.join(video_dir, f"{random_name}.mp4")  # Archivo final en MP4

    ydl_opts = {
        'format': 'bestvideo+bestaudio/best',
        'outtmpl': temp_file_path,  # Usa el nombre aleatorio como salida
        'merge_output_format': 'webm',  # Guarda como .webm
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])  # Descarga el video con el nombre aleatorio

    print(f"Video descargado temporalmente: {temp_file_path}")
    
    # Convertir a MP4 para el cliente
    result = subprocess.run(['ffmpeg', '-i', temp_file_path, final_file_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    if result.returncode != 0:
        print(f"Error al convertir a MP4: {result.stderr.decode()}")
        raise Exception(f"Error al convertir el video: {result.stderr.decode()}")

    print(f"Video convertido a MP4: {final_file_path}")
    
    # Elimina el archivo temporal .webm
    os.remove(temp_file_path)

    return final_file_path  # Retorna la ruta absoluta del archivo MP4

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("No se proporcionó la URL.")
        sys.exit(1)
    url = sys.argv[1]  # Recibe la URL desde los argumentos
    try:
        output_video_path = download_video(url)
        print(output_video_path)  # Imprime la ruta para que Node.js la capture
    except Exception as e:
        print(f"Error: {e}")
