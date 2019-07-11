import db from '../db/config';
import queries from '../db/queries';
import utils from '../../utils';

const {
  insertUser, getSingleUser,
} = queries;

class User {
  /**
   * @static signup
   * @description creates a new user entry in the database
   * @param { String } firstName
   * @param { String } lastName
   * @param { String } email
   * @param { String } hashedPassword
   * @param { Number } phoneNumber
   * @param { String } address
   * @param { boolean } isAdmin
   * @returns { Object } the created user details
   * @memberof User
   */
  static async signup(firstName, lastName, email, hashedPassword, phoneNumber, address, isAdmin) {
    try {
      const values = [
        email, firstName, lastName, hashedPassword, phoneNumber, address, isAdmin,
      ];
      const { rows } = await db.query(insertUser, values);
      return utils.camelCased(rows[0]);
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
      return utils.camelCased(rows[0]);
    } catch (error) {
      throw error;
    }
  }
}

export default User;
