import express from 'express';
import userController from '../controllers/user.controller';
const router = express.Router();

// All routes associated to their corresponding controller
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

module.exports = router;
