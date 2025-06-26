"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const favouritesController_1 = require("../controllers/favouritesController");
const router = (0, express_1.Router)();
router.get('/', auth_1.authenticate, (req, res, next) => (0, favouritesController_1.getUserFavourites)(req, res).catch(next));
exports.default = router;
