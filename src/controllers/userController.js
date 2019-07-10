import userModel from '../models/methods/user';
import utils from '../utils';
import ResponseMsg from '../utils/responseMsg';

const { response, responseErr } = ResponseMsg;

class UserController {
  static async signup(req, res) {
    const {
      firstName, lastName, email, password, phoneNumber, address, isAdmin,
    } = req.body;
    const hashedPassword = utils.hashPassword(password);
    try {
      const user = await userModel
        .signup(firstName, lastName, email, hashedPassword, phoneNumber, address, isAdmin);
      const token = await utils.generateToken({
        id: user.id,
        isAdmin: user.isAdmin,
      });
      return response(res, 201, {
        token, id: user.id, firstName, lastName, email,
      });
    } catch (error) {
      if (error.constraint === 'users_email_key') {
        return responseErr(res, 409, 'Kindly use another email, this email address has already been used');
      }
      return responseErr(res, 500, 'Internal server error');
    }
  }
}

export default UserController;
