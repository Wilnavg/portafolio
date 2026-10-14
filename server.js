
const express = require("express");
const rateLimit = require("express-rate-limit");
const limiteContacto = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: {
        error: "Demasiadas solicitudes. Intenta nuevamente más tarde."
    }
});
require("dotenv").config();
function verificarClaveAdmin(req, res, next) {

    const clave = req.headers["x-admin-key"];

    if (!process.env.ADMIN_API_KEY) {
        return res.status(500).json({
            error: "La clave de administrador no está configurada."
        });
    }

    if (clave !== process.env.ADMIN_API_KEY) {
        return res.status(401).json({
            error: "Clave de administrador incorrecta o ausente."
        });
    }

    next();
}


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

app.post("/api/contacto", limiteContacto, function(req, res) {
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

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email.trim())) {
        return res.status(400).json({
            error: "El email no tiene un formato válido."
        });
    }

    if (nombre.trim().length < 2) {
    return res.status(400).json({
        error: "El nombre debe tener al menos 2 caracteres."
    });
    }

    if (mensaje.trim().length < 5) {
    return res.status(400).json({
        error: "El mensaje debe tener al menos 5 caracteres."
    });
    }

    if (mensaje.trim().length > 500) {
    return res.status(400).json({
        error: "El mensaje no puede superar los 500 caracteres."
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

app.get("/api/contactos", verificarClaveAdmin, function(req, res) {
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


app.put("/api/contactos/:id", verificarClaveAdmin, function(req, res) {    const id = Number(req.params.id);
    const { nombre, email, mensaje } = req.body;

    if (
        !Number.isInteger(id) ||
        id <= 0 ||
        typeof nombre !== "string" ||
        typeof email !== "string" ||
        typeof mensaje !== "string" ||
        !nombre.trim() ||
        !email.trim() ||
        !mensaje.trim()
    ) {
        return res.status(400).json({
            error: "El ID y todos los campos son obligatorios y deben ser válidos."
        });
    }

    try {
        const actualizarContacto = db.prepare(`
            UPDATE contactos
            SET nombre = ?, email = ?, mensaje = ?
            WHERE id = ?
        `);

        const resultado = actualizarContacto.run(
            nombre.trim(),
            email.trim(),
            mensaje.trim(),
            id
        );

        if (resultado.changes === 0) {
            return res.status(404).json({
                error: "No se encontró un contacto con ese ID."
            });
        }

        res.json({
            mensaje: "Contacto actualizado correctamente.",
            id: id
        });
    } catch (error) {
        console.error("Error al actualizar el contacto:", error);

        res.status(500).json({
            error: "No se pudo actualizar el contacto."
        });
    }
});


app.delete("/api/contactos/:id", verificarClaveAdmin, function(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "El ID debe ser un número entero positivo."
        });
    }

    try {
        const eliminarContacto = db.prepare(
            "DELETE FROM contactos WHERE id = ?"
        );

        const resultado = eliminarContacto.run(id);

        if (resultado.changes === 0) {
            return res.status(404).json({
                error: "No se encontró un contacto con ese ID."
            });
        }

        res.json({
            mensaje: "Contacto eliminado correctamente.",
            id: id
        });
    } catch (error) {
        console.error("Error al eliminar el contacto:", error);

        res.status(500).json({
            error: "No se pudo eliminar el contacto."
        });
    }
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
