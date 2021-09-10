import characterController from '../controllers/characterArchetype.controller';
import checkAuthorization from '../middleware/checkAuthorization';
import express from 'express';

const router = express.Router();

router.post('/:type/:label', checkAuthorization, characterController.postCharacterSettings);
router.get('/:user', checkAuthorization, characterController.getCharacterSettings);

module.exports = router;
