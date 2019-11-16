const express = require('express');
const router = express.Router();
const example = require('../controllers/example.controller');

router.get('blah', example.postExample);

module.exports = router;
