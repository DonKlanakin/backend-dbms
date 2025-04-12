const pool = require("../db/pool");

exports.createUsers = async (users) => {
    const values = users.map(({ id, name, email, age }) =>
        `('${id}', '${name}', '${email}', ${age})`).join(',');
    const query = `
        INSERT INTO users (id, name, email, age) VALUES ${values}
    `;

    await pool.query(query);
};

exports.getAllUsers = async () => {
    let result = {};
    try {
        result = await pool.query(`
            SELECT * FROM users ORDER BY id ASC
        `);
        result = result.rows;
    } catch (err) {
        result = { 
            error: err.message
        };
    };

    return result;
};

exports.getUserById = async (req, res) => {
    let result = {};
    try {
        result = await pool.query(`
            SELECT * FROM users WHERE id = $1
        `, [req.params.id]);
    } catch (err) {
        result = {
            error: err.message
        };
    };

    return result;
};

exports.updateUserById = async (id, user) => {
    let result = {};
    try {
        const { name, email, age } = user;
        result = await pool.query(`
            UPDATE users
            SET name = $1,
                email = $2,
                age = $3
            WHERE id = $4
            RETURNING *
        `, [name, email, age, id]);
    } catch (err) {
        result = {
            error: err.message
        };
    };

    return result;
}