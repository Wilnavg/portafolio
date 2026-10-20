
const express = require("express");
const router = express.Router();

const db = require("../database");
const verificarClaveAdmin = require("../middleware/verificarClaveAdmin");


router.get("/contactos", verificarClaveAdmin, function(req, res) {
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



const rateLimit = require("express-rate-limit");

const limiteContacto = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: {
        error: "Demasiadas solicitudes. Intenta nuevamente más tarde."
    }
});

router.post("/contacto", limiteContacto, function(req, res) {
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

        return res.json({
            mensaje: "¡Mensaje guardado correctamente en la base de datos!"
        });
    } catch (error) {
        console.error("Error al guardar el mensaje:", error);

        return res.status(500).json({
            error: "No se pudo guardar el mensaje."
        });
    }
});



router.put("/contactos/:id", verificarClaveAdmin, function(req, res) {
    const id = Number(req.params.id);
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



router.delete("/contactos/:id", verificarClaveAdmin, function(req, res) {
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




module.exports = router;

