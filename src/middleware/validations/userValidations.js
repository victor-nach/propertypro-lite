import validatorHelpers from '../../utils/validatorHelpers';

const {
  checkEmpty, checkAlphabets, checkMinLength,
  checkMaxLength, checkEmail, noWhiteSpace,
} = validatorHelpers;

// Validate sign up
const checkSignUp = [];
checkEmpty(checkSignUp, 'first_name', 'last_name', 'email', 'password', 'phone_number', 'address');
checkAlphabets(checkSignUp, 'first_name', 'last_name');
checkMinLength(checkSignUp, 3, 'first_name', 'last_name');
checkMinLength(checkSignUp, 6, 'password');
checkMaxLength(checkSignUp, 20, 'first_name', 'last_name', 'password');
checkMaxLength(checkSignUp, 50, 'address');
noWhiteSpace(checkSignUp, 'first_name', 'last_name', 'email', 'password', 'phone_number');
// checkBool(checkSignUp, 'is_admin');
checkEmail(checkSignUp, 'email');

// validate sign in
const checkSignIn = [];
checkEmpty(checkSignIn, 'email', 'password');
noWhiteSpace(checkSignIn, 'email', 'password');
checkEmail(checkSignIn, 'email');

const userValidations = {
  checkSignUp,
  checkSignIn,
};

export default userValidations;
