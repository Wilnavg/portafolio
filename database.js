
const Database = require("better-sqlite3");

// Crear o abrir el archivo de la base de datos
const db = new Database("portfolio.db");

// Crear la tabla de mensajes si todavía no existe
db.exec(`
    CREATE TABLE IF NOT EXISTS contactos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL,
        mensaje TEXT NOT NULL,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

console.log("Base de datos lista.");

module.exports = db;
