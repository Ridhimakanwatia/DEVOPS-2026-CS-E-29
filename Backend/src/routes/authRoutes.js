const express = require("express");
const controller = require("../controllers/authController");
const requireAuth = require("../middleware/auth");
const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/me", requireAuth, controller.me);
router.get("/favourites", requireAuth, controller.favourites);
router.post("/favourites/:laptopId", requireAuth, controller.addFavourite);
router.delete("/favourites/:laptopId", requireAuth, controller.removeFavourite);

module.exports = router;
