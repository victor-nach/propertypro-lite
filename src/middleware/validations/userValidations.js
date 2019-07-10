import validatorHelpers from '../../utils/validatorHelpers';

const {
  checkEmpty, checkAlphabets, checkMinLength, checkBool,
  checkMaxLength, checkEmail, noWhiteSpace,
} = validatorHelpers;

// Validate sign up
const checkSignUp = [];
checkEmpty(checkSignUp, 'firstName', 'lastName', 'email', 'password', 'phoneNumber', 'address');
checkAlphabets(checkSignUp, 'firstName', 'lastName');
checkMinLength(checkSignUp, 3, 'firstName', 'lastName');
checkMinLength(checkSignUp, 6, 'password');
checkMaxLength(checkSignUp, 20, 'firstName', 'lastName', 'password');
checkMaxLength(checkSignUp, 50, 'address');
noWhiteSpace(checkSignUp, 'firstName', 'lastName', 'email', 'password', 'phoneNumber');
checkBool(checkSignUp, 'isAdmin');
checkEmail(checkSignUp, 'email');

const userValidations = {
  checkSignUp,
};

export default userValidations;
