const fs = require("fs");
const pool = require("../db/pool");

const dataSource = "resources/data/user-data.txt";
const dataEncoder = "utf-8";

exports.createUsers = async (users) => {
    const values = users.map(({ id, name, email, age }) => `('${id}', '${name}', '${email}', ${age})`).join(',');
    const query = `INSERT INTO users (id, name, email, age) VALUES ${values}`;

    await pool.query(query);
};

// exports.getAllUsers = async (req, res) => {
//     let result = {};

//     try {
//         result = await pool.query('SELECT * FROM users ORDER BY id ASC');
//         // res.json(result.rows);
//         result = json(result.rows);
//     } catch (err) {
//         // res.status(500).json({ error: err.message });
//         result = json({ error: err.message });
//     }

//     return result;
// };

// exports.getUserById = async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
//         if (result.rows.length === 0) return res.status(404).json({ error: "User not found." });
//         res.json(result.rows[0]);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// exports.updateUserById = async (req, res) => {
//     const { name, email, age } = req.body;
//     try {
//         const result = await pool.query(
//         'UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *',
//         [name, email, age, req.params.id]
//         );
//         if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
//         res.json(result.rows[0]);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };