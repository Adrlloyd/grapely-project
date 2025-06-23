import { Router } from 'express';
import {
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController';

const router: Router = Router();

router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;