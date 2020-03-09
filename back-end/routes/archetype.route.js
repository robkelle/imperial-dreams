import archetypeController from '../controllers/archetype.controller';
import checkAuthorization from '../middleware/checkAuthorization';
import express from 'express';

const router = express.Router();

// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
const multer = require('multer');

const upload = multer({
	dest: 'uploads/'
});

router.post('/archetype', upload.single('archetypeImage'), checkAuthorization, archetypeController.postArchetype);
router.get('/archetype/groupByType', checkAuthorization, archetypeController.getArchetypeGroupByType);
router.get('/archetype/:type', checkAuthorization, archetypeController.getArchetypeByType);

module.exports = router;
