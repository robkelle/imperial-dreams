import characterController from '../controllers/character.controller';
import checkAuthorization from '../middleware/checkAuthorization';
import express from 'express';

const router = express.Router();

router.get('/:type', characterController.postCharacterType);

module.exports = router;
