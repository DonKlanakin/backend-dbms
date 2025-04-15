const pool = require("../db/pool");

exports.createUsers = async (users) => {
    const sqlInstructions = `
        INSERT INTO users (id, name, email, age)
        VALUES ${
            users.map((_, i) => `
                ($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})
            `).join(', ')
        };
    `;
  
    const values = users.flatMap(({ id, name, email, age }) => [id, name, email, age]);
    return await pool.query(sqlInstructions, values);
};

exports.getAllUsers = async (filters = {}) => {
    let result = {};
    let sqlInstructions = `SELECT * FROM users`;
    let values = [];
    let conditions = [];
 
    if (filters.age) {
        values.push(filters.age);
        conditions.push(`age = $${values.length}`);
    }
    
    if (filters.email) {
        values.push(`%${filters.email.toLowerCase()}%`);
        conditions.push(`LOWER(email) LIKE $${values.length}`);
    }

    if (filters.name) {
        values.push(`%${filters.name.toLowerCase()}%`);
        conditions.push(`LOWER(name) LIKE $${values.length}`);
    }

    const permittedSortFields = [
        "age", "email", "id", "limit",
        "name", "order", "page", "sort_by"
    ];
    const permittedSortOrders = [
        "asc", "desc"
    ];

    if (filters.sort_by && permittedSortFields.includes(filters.sort_by)) {
        sqlInstructions += ` ORDER BY ${filters.sort_by}`;
    }

    if (filters.order && permittedSortOrders.includes(filters.order)) {
        sqlInstructions += ` ${filters.order.toUpperCase()}`;
    }

    if (conditions.length > 0) {
        sqlInstructions += ` WHERE ` + conditions.join(' AND ');
    }

    if ((filters.page > 0) && (filters.limit > 0)) {
        const offset = (filters.page - 1) * filters.limit;
        values.push(filters.limit);
        values.push(offset);
        sqlInstructions += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;
    }

    try {
        result = await pool.query(sqlInstructions, values);
        result = result.rows;
    } catch (err) {
        result = {
            stackTrace: "user-repository :: getAllUsers",
            error: err.toString()
        };
    }

    return result;
};

exports.getUserById = async (req, res) => {
    let result = {};
    let sqlInstructions = `
        SELECT * FROM users WHERE id = $1
    `;

    try {
        result = await pool.query(sqlInstructions, [req.params.id]);
// [TEST DB CONNECTION ERROR]
//        result = await pool.query(null, [req.params.id]); // send NULL
// [TEST DB CONNECTION ERROR]
    } catch (err) {
        result = {
            stackTrace: "user-repository :: getUserById",
            error: err.toString()
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
            stackTrace: "user-repository :: updateUserById",
            error: err.toString()
        };
    };

    return result;
};

exports.deleteUserById = async (req, res) => {
    let result = {};
    let sqlInstructions = `
        DELETE FROM users WHERE id = $1 RETURNING *
    `;

    try {
        result = await pool.query(sqlInstructions, [req.params.id]);
    } catch (err) {
        result = {
            stackTrace: "user-repository :: deleteUserById",
            error: err.toString()
        };
    }

    return result;
};