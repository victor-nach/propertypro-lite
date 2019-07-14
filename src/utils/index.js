import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

class Services {
  /**
   * @static hashPassword
   * @description hashes a password
   * @param { string } password
   * @returns hashed password
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  /**
   * @static generateToken
   * @description generates authentication token
   * @param { Object } payload - { id, type, is_admin }
   * @returns { String } token
   */
  static generateToken(payload, secret) {
    return jwt.sign(payload, secret || process.env.SECRET, { expiresIn: '2w' });
  }

  /**
   * @static decodeToken
   * @description decodes the token and returns the corresponding payload
   * @param { String } token
   * @returns { Object } payload - { id, type, is_admin }
   * @memberof Helper
   */
  static decodeToken(token, secret) {
    return jwt.verify(token, secret || process.env.SECRET);
  }

  /**
   * @static comparePassword
   * @description compares two passwords
   * @param { String } password
   * @param { String } hashed_password
   * @returns { Boolean } True or false
   */
  static comparePassword(password, hashed_password) {
    return bcrypt.compareSync(password, hashed_password);
  }

  /**
   * @static camelCased
   * @param { Object } object
   * @description converts keys in an object from snake_case to camelCase
   * @returns a new object
   * @memberof Services
   */
  // static camelCased(object) {
  //   const newObject = {};
  //   Object.entries(object).forEach((entry) => {
  //     const newKey = entry[0].replace(/(_\w)/g, match => match[1].toUpperCase());
  //     newObject[newKey] = entry[1];
  //   });
  //   return newObject;
  // }
}

export default Services;
