const router = require("express").Router();
const { validate } = require("../models/commentModel");
const validator = require("../middleware/validate");
const auth = require("../middleware/auth");
const controller = require("../controllers/commentController");

router.get("/", controller.getAll);

router.get("/:id", controller.getOne);

router.use(auth.protect);
router.get("/like/:id", controller.likeOne);
router.get("/dislike/:id", controller.dislikeOne);
router.post("/reply/:id", validator(validate), controller.reply);

module.exports = router;
