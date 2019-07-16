import userModel from '../models/methods/user';
import utils from '../utils';
import ResponseMsg from '../utils/responseMsg';

const { response, responseErr } = ResponseMsg;

class UserController {
  /**
   * @static
   * @name Signin
   * @description sends a password reset link and handles the post request
   * that receives the user's email
   * @returns response object
   * @param { Object} req
   * @param { Object } res
   * @memberof UserController
   */
  static async signup(req, res) {
    const {
      first_name, last_name, email, password, phone_number, address, is_admin,
    } = req.body;
    const hashed_password = utils.hashPassword(password);
    try {
      const user = await userModel.signup(
        first_name, last_name, email, hashed_password, phone_number, address, is_admin || false,
      );
      const token = await utils.generateToken({
        id: user.id,
        is_admin: user.is_admin,
      });
      return response(res, 201, {
        token, id: user.id, first_name, last_name, email,
      });
    } catch (error) {
      if (error.constraint === 'users_email_key') {
        return responseErr(res, 409, 'Kindly use another email, this email address has already been used');
      }
      return responseErr(res, 500, 'Internal server error');
    }
  }

  /**
   * @static
   * @name Signin
   * @description signs a usser in and generate token
   * @param { Object} req
   * @param { Object } res
   * @returns response object
   * @memberof UserController
   */
  static async signin(req, res) {
    const { email, password } = req.body;
    try {
      const {
        id, first_name, last_name, hashed_password, is_admin,
      } = await userModel.signin(email);
      const token = await utils.generateToken({ id, is_admin });
      if (utils.comparePassword(password, hashed_password) === true) {
        return response(res, 200, {
          token, first_name, last_name, email,
        });
      }
      return responseErr(res, 403, 'the password you have entered is invalid');
    } catch (error) {
      // if (error.name === 'email_null') {
      return responseErr(res, 404, 'this email has been not been registered on this platform');
      // }
      // return responseErr(res, 500, 'Internal server error');
    }
  }
}

export default UserController;
