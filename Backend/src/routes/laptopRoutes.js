const express = require("express");
const controller = require("../controllers/laptopController");
const router = express.Router();

router.get("/", controller.list);
router.get("/:id", controller.details);

module.exports = router;
