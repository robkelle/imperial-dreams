import archetypeController from '../controllers/archetype.controller';
import express from 'express';
const router = express.Router();

const multer = require('multer');

const upload = multer({
	dest: 'uploads/'
});

router.post('/archetype', upload.single('archetypeImage'), archetypeController.postArchetype);

module.exports = router;
