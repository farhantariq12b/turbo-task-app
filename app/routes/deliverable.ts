import express from 'express';
import { Authentication } from '../middleware';
import UserController from '../deliverables/DeliverableController';
const router = express.Router();

router.use(Authentication.authenticate);

router.get(`/`, UserController.getPaginatedList);
router.get(`/:id`, UserController.getDeliverableById);

export default router;
