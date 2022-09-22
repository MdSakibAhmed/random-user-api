const express = require("express");
const router = express.Router();
const User = require("../controllers/userController");
const { validateId } = require("../middleware/validateId");
const { validateProperty } = require("../middleware/validateProperty");
router.get("/random",User.getRandomeUser);

router.get("/all",User.getAllUser);
router.post("/save", validateProperty, User.saveUser);
router.patch("/update/:id",validateId, User.updateRandomUser);
router.patch("/bulk-update",User.updateMultipleUser);
router.delete("/delete/:id",validateId,User.deleteUser);
module.exports = router;