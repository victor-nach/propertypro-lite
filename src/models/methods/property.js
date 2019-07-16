import db from '../db/config';
import queries from '../db/queries';

const {
  insertProperty, getSingleProperty, updatePrice,
  updateStatus, getAllProperties,
} = queries;

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
   * @memberof Property
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

  /**
   * @static editproperty
   * @description updates the price for a property
   * @param { Number }  user id
   * @param { String } userid status - active or dormant
   * @param { String } price
   * @returns { Object } details from the updated property
   * @memberof User
   */
  static async editPrice(id, price) {
    const values = [price, id];
    const { rows } = await db.query(updatePrice, values);
    const {
      status, type, state, city, address, created_on, image_url,
    } = rows[0];
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

  /**
   * @static editStatus
   * @description mark a property as sold
   * @param { Number }  id id
   * @returns { Object } details from the updated property
   * @memberof User
   */
  static async editStatus(id) {
    const values = ['sold', id];
    const { rows } = await db.query(updateStatus, values);
    const {
      price, status, type, state, city, address, created_on, image_url,
    } = rows[0];
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

  /**
   * @static checkEditproperty
   * @description checks for availabitlity and ownership of a users property
   * @param { Number }  user id
   * @param { Number } userid
   * @returns { Object } details from the updated property
   * @memberof Property
   */
  static async checkEditProperty(id, user_id) {
    const values = [id];
    const { rows } = await db.query(getSingleProperty, values);
    if (!rows[0]) {
      const error = new Error();
      error.name = 'property_null';
      throw error;
    }
    if (rows[0].owner !== user_id) {
      const error = new Error();
      error.name = 'unauthorized';
      throw error;
    }
  }

  /**
   * @static allProperties
   * @description retreives all properties in the database
   * @returns { Array } an array of all the propertis
   * @memberof Property
   */
  static async allProperties() {
    const { rows } = await db.query(getAllProperties);
    return rows;
  }

  /**
   * @static getSingleProperty
   * @description returns a single property
   * @param { Number }  id id
   * @returns { Object } the property
   * @memberof Property
   */
  static async getSingleProperty(id) {
    const values = [id];
    const { rows } = await db.query(getSingleProperty, values);
    if (!rows[0]) {
      const error = new Error();
      error.name = 'property_null';
      throw error;
    }
    return rows[0];
  }
}

export default Property;
