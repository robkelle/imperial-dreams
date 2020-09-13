import characterController from '../controllers/characterArchetype.controller';
import checkAuthorization from '../middleware/checkAuthorization';
import express from 'express';

const router = express.Router();

router.post('/:type/:label', characterController.postCharacterSettings);
router.get('/:user', characterController.getCharacterSettings);

module.exports = router;
