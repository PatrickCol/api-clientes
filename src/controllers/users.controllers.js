import { pool } from "../db.js";

export const rootEndpoint = async (req, res) => {
  res.status(200).send("API is working properly");
};

export const getUsers = async (req, res) => {
  const response = await pool.query("SELECT * FROM users ORDER BY ID_usuario ASC");
  res.status(200).json(response.rows);
};

export const getSubscriptions = async (req, res) => {
  const response = await pool.query("SELECT * FROM subscriptions ORDER BY ID_membresia ASC");
  res.status(200).json(response.rows);
};

export const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await pool.query("SELECT * FROM users WHERE ID_usuario = $1", [id]);
  res.json(response.rows);
};

export const getSubscriptionById = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await pool.query("SELECT * FROM subscriptions WHERE ID_membresia = $1", [id]);
  res.json(response.rows);
};

export const createUser = async (req, res) => {
  try {
    const { nombre, apellido, correo, id_membresia } = req.body;

    const { rows } = await pool.query(
      "INSERT INTO users (nombre, apellido, correo, id_membresia) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, apellido, correo, id_membresia]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createSubscription = async (req, res) => {
  try {
    const { nombre, precio_mensual, descripcion } = req.body;

    const { rows } = await pool.query(
      "INSERT INTO subscriptions (nombre, precio_mensual, descripcion) VALUES ($1, $2, $3) RETURNING *",
      [nombre, precio_mensual, descripcion]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, apellido, correo, id_membresia } = req.body;

  const { rows } = await pool.query(
    "UPDATE users SET nombre = $1, apellido = $2, correo = $3, id_membresia = $4 WHERE id_usuario = $5 RETURNING *",
    [nombre, apellido, correo, id_membresia, id]
  );

  return res.json(rows[0]);
};

export const updateSubscription = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, precio_mensual, descripcion } = req.body;

  const { rows } = await pool.query(
    "UPDATE subscriptions SET nombre = $1, precio_mensual = $2, descripcion = $3 WHERE id_membresia = $4 RETURNING *",
    [nombre, precio_mensual, descripcion, id]
  );

  return res.json(rows[0]);
};

export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { rowCount } = await pool.query("DELETE FROM users where id_usuario = $1", [
    id,
  ]);

  if (rowCount === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  return res.sendStatus(204);
};

export const deleteSubscription = async (req, res) => {
  const id = parseInt(req.params.id);
  const { rowCount } = await pool.query("DELETE FROM subscriptions where id_memebresia = $1", [
    id,
  ]);

  if (rowCount === 0) {
    return res.status(404).json({ message: "Membresia no encontrada" });
  }

  return res.sendStatus(204);
};
