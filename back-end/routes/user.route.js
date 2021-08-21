import checkAuthorization from '../middleware/checkAuthorization';
import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

// All routes associated to their corresponding controller

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/forgot', userController.forgotPassword);
router.post('/reset', checkAuthorization, userController.resetPassword);
router.get('/logout', userController.logout);
router.get('/verify', checkAuthorization, userController.verifyAuth);

module.exports = router;
