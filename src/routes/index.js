import express from 'express';
import userRoutes from './userRoutes';
import ResponseMsg from '../utils/responseMsg';

const router = express.Router();

router.use('/auth', userRoutes);

router.get('/', (req, res) => {
  ResponseMsg.responseShort(res, 200, 'welcome to property-pro-lite version 1.0');
});

export default router;
