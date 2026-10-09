
const express = require("express");
const cors = require("cors");
const db = require("./database");


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

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


app.post("/api/contacto", function(req, res) {
    const { nombre, email, mensaje } = req.body;

    if (
        typeof nombre !== "string" ||
        typeof email !== "string" ||
        typeof mensaje !== "string" ||
        !nombre.trim() ||
        !email.trim() ||
        !mensaje.trim()
    ) {
        return res.status(400).json({
            error: "Todos los campos son obligatorios."
        });
    }

    try {
        const guardarContacto = db.prepare(`
            INSERT INTO contactos (nombre, email, mensaje)
            VALUES (?, ?, ?)
        `);

        guardarContacto.run(
            nombre.trim(),
            email.trim(),
            mensaje.trim()
        );

        console.log("Mensaje guardado en SQLite correctamente.");

        res.json({
            mensaje: "¡Mensaje guardado correctamente en la base de datos!"
        });
    } catch (error) {
        console.error("Error al guardar el mensaje:", error);

        res.status(500).json({
            error: "No se pudo guardar el mensaje."
        });
    }
});


app.get("/api/contactos", function(req, res) {
    try {
        const contactos = db.prepare(`
            SELECT id, nombre, email, mensaje, fecha
            FROM contactos
            ORDER BY id DESC
        `).all();

        res.json(contactos);
    } catch (error) {
        console.error("Error al consultar los contactos:", error);

        res.status(500).json({
            error: "No se pudieron consultar los contactos."
        });
    }
});

app.listen(PORT, function() {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
