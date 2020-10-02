import Character from '../controllers/character.controller';
import checkAuthorization from '../middleware/checkAuthorization';
import express from 'express';

const router = express.Router();

// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
const multer = require('multer');

const upload = multer({
	dest: 'uploads/'
});

router.post('/', upload.single('characterImage'), checkAuthorization, Character.postCharacterImage);
router.get('/:userID', checkAuthorization, Character.getProfileImage);

module.exports = router;
