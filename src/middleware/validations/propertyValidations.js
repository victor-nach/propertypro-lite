import validatorHelpers from '../../utils/validatorHelpers';

const {
  checkEmpty, checkMinLength,
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

const propertyValidations = {
  checkCreateProperty,
};

export default propertyValidations;
