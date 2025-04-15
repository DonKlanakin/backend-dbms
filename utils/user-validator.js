const pool = require("../db/pool");

// Regex TESTED USING https://regexr.com/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Name validating (allows Thai, English, spaces/hyphens/apostrophes)
const nameRegex = /^[A-Za-zก-๙\s'-]{2,}$/u;

const validateUserFields = async (user, { checkEmailUnique = false, excludeId = null } = {}) => {
    const { id, name, email, age } = user;
    const parsedAge = parseInt(age);

    if (!name || !email || age === undefined) {throw new Error("Missing required user fields.");}
    if (name.length < 2 || !nameRegex.test(name)) {throw new Error(`Invalid name format: "${name}"`);}
    if (!emailRegex.test(email)) {throw new Error(`Invalid email format: "${email}"`);}
    if (isNaN(parsedAge) || parsedAge <= 0) {throw new Error(`Invalid age: "${age}"`);}
    if (checkEmailUnique) {
        const query = `
            SELECT id FROM users 
            WHERE LOWER(email) = LOWER($1)
            ${excludeId ? 'AND id != $2' : ''}
        `;
        const values = excludeId ? [email, excludeId] : [email];

        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            throw new Error(`Email "${email}" already exists.`);
        }
    }

    return {
        id,
        name,
        email,
        age: parsedAge
    };
};

module.exports = validateUserFields;
