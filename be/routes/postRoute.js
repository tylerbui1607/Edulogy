const router = require("express").Router();
const controller = require("../controllers/postController");
const validator = require("../middleware/validate");
const auth = require("../middleware/auth");
const { validate } = require("../models/postModel");
router.get("/", controller.getAll);
router.get("/hot", controller.getTrending);
router.use(auth.protect);
router.post("/", validator(validate), controller.addOne);
module.exports = router;
