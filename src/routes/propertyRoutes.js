import express from 'express';
import PropertyController from '../controllers/propertyController';
import PropertyValidations from '../middleware/validations/propertyValidations';
import validateResult from '../middleware/validations/validateResult';
import validateResult1 from '../middleware/validations/validateResult1';
import Auth from '../middleware/authentication/auth';
// import { multerUploads } from '../middleware/multer';

const router = express.Router();

const { verifyAdmin, verifyToken } = Auth;
const {
  checkCreateProperty, checkUpdatePrice, checkUpdateStatus,
  checkSingleProperty, checkDeleteProperty,
} = PropertyValidations;

router.post(
  '/',
  // multerUploads,
  verifyToken,
  // verifyAdmin,
  checkCreateProperty,
  validateResult1,
  PropertyController.createProperty,
);

router.patch(
  '/:id/',
  verifyToken,
  // verifyAdmin,
  checkUpdatePrice,
  validateResult,
  PropertyController.updatePrice,
);

router.patch(
  '/:id/sold/',
  verifyToken,
  // verifyAdmin,
  checkUpdateStatus,
  validateResult,
  PropertyController.updateStatus,
);

router.get(
  '/',
  verifyToken,
  PropertyController.getProperties,
);

router.get(
  '/:id/',
  verifyToken,
  checkSingleProperty,
  validateResult,
  PropertyController.getProperties,
);

router.delete(
  '/:id',
  verifyToken,
  // verifyAdmin,
  checkDeleteProperty,
  validateResult,
  PropertyController.deleteProperty,
);

export default router;
