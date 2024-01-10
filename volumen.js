const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

function obtenerVolumen(videoPath) {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
        if (err) {
            console.error(`Error al obtener la información del video ${videoPath}: ${err}`);
            return;
        }

        const audioStream = metadata.streams.find(stream => stream.codec_type === 'audio');
        if (audioStream && audioStream.tags) {
            const volumen = audioStream.tags.BPS || 'No disponible';
            console.log(`Nombre del archivo: ${videoPath}, Volumen: ${volumen}`);
        } else {
            console.log(`Nombre del archivo: ${videoPath}, Volumen no disponible`);
        }
    });
}

// Ruta de la carpeta de entrada con videos
const inputFolder = 'C:\\Users\\voupi\\Downloads\\temp_video.mp4';

// Listar todos los archivos en la carpeta de entrada
fs.readdirSync(inputFolder).forEach((filename) => {
    const filePath = `${inputFolder}/${filename}`;

    // Verificar si el archivo es un video (extensión mp4)
    if (fs.statSync(filePath).isFile() && filename.toLowerCase().endsWith('.mp4')) {
        // Llamar a la función para obtener el volumen
        obtenerVolumen(filePath);
    }
});
