import express from 'express';
import deliverableRouter from './deliverable';
import { ErrorHandler, RequestLogger } from '../middleware';

const router = express.Router();

router.use(ErrorHandler.handleException);
router.use(RequestLogger.log);

router.get('/', (req, res, next) => {
  res.send({ title: 'Turbo app showcase' });
});

router.use('/api/deliverables', deliverableRouter)

export default router;
 