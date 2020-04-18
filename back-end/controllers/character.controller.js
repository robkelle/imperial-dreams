import Character from '../models/archetype.model';
import { request } from 'http';

exports.postCharacterType = (req, res) => {
	console.log(req.params);
	res.status(200).send(req.params);
};
