const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

function nivelarVolumen(videoPath, outputPath, targetDb = -20.0) {
    ffmpeg(videoPath)
        .audioFilter('volume=' + targetDb)
        .videoCodec('libx264')
        .audioCodec('aac')
        .on('end', () => {
            console.log(`Procesado: ${videoPath}`);
        })
        .on('error', (err) => {
            console.error(`Error al procesar ${videoPath}: ${err}`);
        })
        .save(outputPath);
}

function procesarCarpeta(inputFolder, outputFolder, targetDb = -20.0) {
    // Verificar si la carpeta de salida existe, si no, crearla
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder);
    }

    // Listar todos los archivos en la carpeta de entrada
    fs.readdirSync(inputFolder).forEach((filename) => {
        const filePath = `${inputFolder}/${filename}`;

        // Verificar si el archivo es un video (extensión mp4)
        if (fs.statSync(filePath).isFile() && filename.toLowerCase().endsWith('.mp4')) {
            // Generar la ruta de salida
            const outputPath = `${outputFolder}/${filename}`;

            // Llamar a la función para nivelar el volumen
            nivelarVolumen(filePath, outputPath, targetDb);
        }
    });
}

// Ruta de la carpeta de entrada con videos
const inputFolder = 'C:\\Users\\voupi\\Downloads\\temp_video.mp4';
// console.log(__dirname + 'ruta del archivo')
// Ruta de la carpeta de salida para videos procesados
const outputFolder = 'C:\\Users\\voupi\\Downloads\\temp_video.mp4\\exports';

// Nivel objetivo del volumen (puedes ajustar esto según tus necesidades)
const targetDb = 2.5;

// Llamar a la función para procesar la carpeta
console.clear()
procesarCarpeta(inputFolder, outputFolder, targetDb);