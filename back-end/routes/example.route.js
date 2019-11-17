import express from 'express';
import example from '../controllers/example.controller';
const router = express.Router();

router.get('/blah', example.postExample);

module.exports = router;
