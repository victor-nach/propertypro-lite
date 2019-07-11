export default {
  // Users
  insertUser: 'INSERT INTO users(email, first_name, last_name, hashed_password, phone_number, address, is_admin) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
  getSingleUser: 'SELECT * FROM users WHERE email = $1;',
};
