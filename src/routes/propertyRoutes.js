import express from 'express';
import PropertyController from '../controllers/propertyController';
import PropertyValidations from '../middleware/validations/propertyValidations';
import validateResult from '../middleware/validations/validateResult';
import Auth from '../middleware/authentication/auth';
// import { multerUploads } from '../middleware/multer';

const router = express.Router();

const { verifyAdmin, verifyToken } = Auth;
const {
  checkCreateProperty,
} = PropertyValidations;

router.post(
  '/',
  // multerUploads,
  verifyToken,
  verifyAdmin,
  checkCreateProperty,
  validateResult,
  PropertyController.createProperty,
);

export default router;
