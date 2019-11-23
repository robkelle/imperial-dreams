import express from "express";
import userController from "../controllers/user.controller";
import checkAuthorization from "../middleware/checkAuthorization";
const router = express.Router();

// All routes associated to their corresponding controller
router.post("/userValidate", userController.userValidate);
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get(
  "/verifyAuth",
  checkAuthorization,
  userController.verifyAuthorization
);

module.exports = router;
