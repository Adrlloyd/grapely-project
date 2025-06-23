"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wineController_1 = require("../controllers/wineController");
const router = (0, express_1.Router)();
router.get('/', wineController_1.getAllWines);
router.get('/search/filter', wineController_1.getRecommendedWines); //This being the 3 that show on the results page, RESTFUL route
router.get('/surprise', wineController_1.getSurpriseWine);
router.get('/:id', wineController_1.getWineById); //Not sure if we need this
exports.default = router;
