import express from 'express';
import userRoutes from './userRoutes';
import propertyRoutes from './propertyRoutes';
import ResponseMsg from '../utils/responseMsg';

const router = express.Router();

router.use('/auth', userRoutes);
router.use('/property', propertyRoutes);

router.get('/', (req, res) => {
  ResponseMsg.responseShort(res, 200, 'welcome to property-pro-lite version 1.0');
});

export default router;
