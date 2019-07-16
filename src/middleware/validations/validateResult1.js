import logger from 'heroku-logger';
import { validationResult } from 'express-validator';

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  logger.info('request', { 'reqBody' : req.body.price });
  // if we have any errors
  if (!errors.isEmpty()) {
    logger.error('this', {'message:': errors.array().map(i => i.msg)[0] });
    return res
      .status(400)
      .json({
        status: 'error',
        // return our custom message
        error: errors.array().map(i => i.msg)[0],
      });
  }
  // else pass control to the next middleware
  return next();
};

export default validateResult;
