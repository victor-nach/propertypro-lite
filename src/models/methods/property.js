import db from '../db/config';
import queries from '../db/queries';

const { insertProperty } = queries;

class Property {
  /**
   * @static
   * @name createProperty
   * @description creates a new property listing entry in the database
   * @param { Number }  user_id
   * @param { Number } price
   * @param { String } state
   * @param { String } city
   * @param { String } address
   * @param { String } type
   * @param { String } image_url
   * @returns { Object } the created property details
   * @memberof User
   */
  static async createProperty(user_id, price, state, city, address, type, image_url) {
    const values = [user_id, price, state, city, address, type, image_url];
    const { rows } = await db.query(insertProperty, values);
    const { id, status, created_on } = rows[0];
    return {
      id,
      status,
      type,
      state,
      city,
      address,
      price,
      created_on,
      image_url,
    };
  }
}

export default Property;
