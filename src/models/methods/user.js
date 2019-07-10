import db from '../db/config';
import queries from '../db/queries';
import services from '../../utils';

const {
  insertUser,
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
      return services.camelCased(rows[0]);
    } catch (error) {
      throw error;
    }
  }
}

export default User;
