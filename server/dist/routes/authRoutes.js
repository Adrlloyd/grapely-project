"use strict";
<<<<<<< HEAD
// import { Router } from 'express';
// import { registerUser, loginUser } from '../controllers/authController';
// const router: Router = Router();
// router.post('/register', registerUser);
// router.post('/login', loginUser);
// export default router;
=======
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post('/register', authController_1.registerUser);
router.post('/login', authController_1.loginUser);
exports.default = router;
>>>>>>> dev
