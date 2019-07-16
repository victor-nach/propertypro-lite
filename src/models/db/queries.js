export default {
  // Users
  insertUser: 'INSERT INTO users(email, first_name, last_name, hashed_password, phone_number, address, is_admin) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
  getSingleUser: 'SELECT * FROM users WHERE email = $1;',

  // Properties
  insertProperty: 'INSERT INTO properties(owner, price, state, city, address, type, image_url) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
  getSingleProperty: 'SELECT * FROM properties WHERE id = $1;',
  updatePrice: 'UPDATE properties set price = $1 where id = $2 returning *;',
  updateStatus: 'UPDATE properties set status = $1 where id = $2 returning *;',
  getAllProperties: 'SELECT * FROM properties;',
  deleteSingleProperty: 'DELETE FROM properties WHERE id = $1;',
};
