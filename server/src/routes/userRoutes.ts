import { Router } from 'express';

import { authenticate } from '../middleware/auth';
import type { AuthenticatedRequest } from '../middleware/auth';
import { updateUserName, updateUserPassword, deleteUser } from '../controllers/userController';

const router: Router = Router();

router.put('/name', authenticate, (req, res, next) => updateUserName(req as AuthenticatedRequest, res).catch(next));
router.put('/password', authenticate, (req, res, next) => updateUserPassword(req as AuthenticatedRequest, res).catch(next));
router.delete('/', authenticate, (req, res, next) => deleteUser(req as AuthenticatedRequest, res).catch(next));

export default router;