import express from 'express';
import testController from '../controllers/test.controller';
const router = express.Router();

router.get('/test', testController.message);

module.exports = router;
