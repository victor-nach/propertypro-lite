import db from '../db/config';
import queries from '../db/queries';

const {
  insertUser, getSingleUser,
} = queries;

class User {
  /**
   * @static signup
   * @description creates a new user entry in the database
   * @param { String } first_name
   * @param { String } last_name
   * @param { String } email
   * @param { String } hashed_password
   * @param { Number } phone_number
   * @param { String } address
   * @param { boolean } is_admin
   * @returns { Object } the created user details
   * @memberof User
   */
  static async signup(
    first_name, last_name, email, hashed_password, phone_number, address, is_admin,
  ) {
    try {
      const values = [
        email, first_name, last_name, hashed_password, phone_number, address, is_admin,
      ];
      const { rows } = await db.query(insertUser, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  /**
   * @static signin
   * @description signs in a user
   * @param { String } email
   * @returns { Object } the signed in user details
   * @memberof User
   */
  static async signin(email) {
    try {
      const values = [email];
      const { rows } = await db.query(getSingleUser, values);
      if (!rows[0]) {
        const error = new Error();
        error.name = 'email_null';
        throw error;
      }
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default User;
