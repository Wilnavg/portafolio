const express = require("express");

require("dotenv").config();

const rutasContactos = require("./routes/contactos");

const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", rutasContactos);

app.get("/", function(req, res) {
    res.send("¡Mi primer servidor backend está funcionando!");
});


app.get("/api/proyectos", function(req, res) {
    const proyectos = [
        {
            nombre: "Mi portafolio web",
            descripcion: "Mi página personal para mostrar mis habilidades y proyectos.",
            tecnologia: "HTML, CSS y JavaScript",
            estado: "En desarrollo",
            enlace: "https://github.com/Wilnavg/portafolio"
        },
        {
            nombre: "Mi primer backend",
            descripcion: "Mi primer servidor que entrega información mediante una API.",
            tecnologia: "Node.js y Express",
            estado: "Completado",
            enlace: "https://github.com/Wilnavg/portafolio"
        }
    ];


    res.json(proyectos);


});


app.get("/api/mensaje", function(req, res) {
    res.json({
        mensaje: "¡Hola desde mi propio backend!",
        autor: "Willian Navarro",
        proyecto: "Mi portafolio Full Stack"
    });
});


app.use(function(error, req, res, next) {
    console.error("Error del servidor:", error);

    res.status(500).json({
        success: false,
        error: "Ocurrió un error interno del servidor."
    });
});


app.listen(PORT, function() {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
