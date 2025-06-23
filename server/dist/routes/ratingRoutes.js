"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ratingController_1 = require("../controllers/ratingController");
const router = (0, express_1.Router)();
router.post('/', ratingController_1.createOrUpdateRating);
router.get('/:userId/:wineId', ratingController_1.getRatingByUserAndWine);
router.delete('/:id', ratingController_1.deleteRating);
exports.default = router;
