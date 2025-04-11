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
    }

    return result;
};