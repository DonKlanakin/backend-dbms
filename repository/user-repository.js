const pool = require("../db/pool");

exports.createUsers = async (users) => {
    let values = users.map(({ id, name, email, age }) =>
        `('${id}', '${name}', '${email}', ${age})`).join(',');
    
    let sqlInstructions = `
        INSERT INTO users (id, name, email, age) VALUES ${values}
    `;

    await pool.query(sqlInstructions);
};

exports.getAllUsers = async () => {
    let result = {};
    let sqlInstructions = `
        SELECT * FROM users ORDER BY id ASC
    `;

    try {
        result = await pool.query(sqlInstructions);
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
    let sqlInstructions = `
        SELECT * FROM users WHERE id = $1
    `;

    try {
        result = await pool.query(sqlInstructions, [req.params.id]);
    } catch (err) {
        result = {
            error: err.message
        };
    };

    return result;
};

exports.updateUserById = async (id, user) => {
    let result = {};
    let sqlInstuctions = `
            UPDATE users
            SET name = $1,
                email = $2,
                age = $3
            WHERE id = $4
            RETURNING *
    `;

    try {
        const { name, email, age } = user;
        result = await pool.query(sqlInstuctions, [name, email, age, id]);
    } catch (err) {
        result = {
            stackTrace: "updateUserById",
            error: err.message
        };
    };

    return result;
};