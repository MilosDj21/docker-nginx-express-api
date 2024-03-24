const { Router } = require("express");

const { findOne, findAll, createOne, updateOne, deleteOne } = require("../controllers/user");

const router = Router();

router.get("/:id", findOne);
router.get("/", findAll);
router.post("/", createOne);
router.patch("/:id", updateOne);
router.delete("/:id", deleteOne);

module.exports = router;
