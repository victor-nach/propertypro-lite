import validatorHelpers from '../../utils/validatorHelpers';

const {
  checkEmpty, checkMinLength, checkNumber,
  checkMaxLength, noWhiteSpace, checkUrl,
} = validatorHelpers;

// Validate sign up
const checkCreateProperty = [];
checkEmpty(checkCreateProperty, 'price', 'state', 'city', 'address', 'type', 'image_url');
checkUrl(checkCreateProperty, 'image_url');
// checkAlphabets(checkCreateProperty, 'type');
checkMinLength(checkCreateProperty, 3, 'state', 'city', 'address', 'type');
checkMaxLength(checkCreateProperty, 20, 'state', 'city', 'type');
checkMaxLength(checkCreateProperty, 50, 'address');
noWhiteSpace(checkCreateProperty, 'price');

// validate update price
const checkUpdatePrice = [];
checkEmpty(checkUpdatePrice, 'price', 'id');
checkNumber(checkUpdatePrice, 'price', 'id');

// validate update status
const checkUpdateStatus = [];
checkEmpty(checkUpdateStatus, 'id');
checkNumber(checkUpdateStatus, 'id');

// validate get single property
const checkSingleProperty = [];
checkEmpty(checkSingleProperty, 'id');
checkNumber(checkSingleProperty, 'id');

// validate delete property
const checkDeleteProperty = [];
checkEmpty(checkDeleteProperty, 'id');
checkNumber(checkDeleteProperty, 'id');

const propertyValidations = {
  checkCreateProperty,
  checkUpdatePrice,
  checkUpdateStatus,
  checkSingleProperty,
  checkDeleteProperty,
};

export default propertyValidations;
