import pool from "../database/db.js";

export const createUser = async (req, res, next) => {
  try {
    const {first_name, last_name, email, password } = req.body;

    const newTask = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, email, password]
    );

    res.json(newTask.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM users");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "user not found" });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// const updateTask = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description } = req.body;

//     const result = await pool.query(
//       "UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *",
//       [title, description, id]
//     );

//     if (result.rows.length === 0)
//       return res.status(404).json({ message: "Task not found" });

//     return res.json(result.rows[0]);
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({ message: "user not found" });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
