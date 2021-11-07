const router = require("express").Router();
var multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const testController = require("../controllers/testController");
const { extractQuestion } = require("../middleware/upload");
const validator = require("../middleware/validate");
const auth = require("../middleware/auth");
const { validate } = require("../models/testModel");

router.get("/", testController.getAll);
router.get("/:id", testController.getOne);
router.post(
  "/",
  upload.single("file"),
  validator(validate),
  extractQuestion,
  testController.addOne
);
router.put("/:id", testController.updateOne);

router.use(auth.protect);
router.use(auth.restrictTo("admin"));

router.delete("/:id", testController.deleteOne);

module.exports = router;
