const db = require("../config/db");

exports.findById = (id, callback) => {
  db.query(
    "SELECT id_usuario, nombre, email FROM usuarios WHERE id_usuario = ?",
    [id],
    callback
  );
};

exports.findByEmail = (email, callback) => {
  db.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    callback
  );
};

exports.create = (data, callback) => {
  db.query("INSERT INTO usuarios SET ?", data, callback);
};
