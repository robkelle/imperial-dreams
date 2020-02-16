import archetypeController from '../controllers/archetype.controller';
import express from 'express';

const router = express.Router();

router.get('/archetype', archetypeController.getArchetypes);

module.exports = router;
