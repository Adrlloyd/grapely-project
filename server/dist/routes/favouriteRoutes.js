"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favouritesController_1 = require("../controllers/favouritesController");
const router = (0, express_1.Router)();
router.get('/:id/favorites', favouritesController_1.getUserFavorites);
exports.default = router;
