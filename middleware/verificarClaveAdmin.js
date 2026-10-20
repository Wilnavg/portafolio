
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

module.exports = verificarClaveAdmin;

