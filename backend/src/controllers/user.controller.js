const pool = require("../config/db");

exports.profile = async (req, res) => {
  const { id_usuario } = req.user;

  const [rows] = await pool.query(
    "SELECT id_usuario, nombre, email FROM usuario WHERE id_usuario = ?",
    [id_usuario]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  res.json(rows[0]);
};
