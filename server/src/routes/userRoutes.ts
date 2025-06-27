import { Router } from 'express';

import { authenticate } from '../middleware/auth';
import type { AuthenticatedRequest } from '../middleware/auth';
import { updateUserPassword, deleteUser } from '../controllers/userController';

const router: Router = Router();

router.put('/', authenticate, (req, res, next) => updateUserPassword(req as AuthenticatedRequest, res).catch(next));
router.delete('/', authenticate, (req, res, next) => deleteUser(req as AuthenticatedRequest, res).catch(next));

export default router;