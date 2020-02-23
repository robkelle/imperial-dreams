import Archetype from '../models/archetype.model';
import fs from 'fs';
import fsExtra from 'fs-extra';

exports.postArchetype = (req, res) => {
	fsExtra.emptyDir('uploads', (err) => {
		if (err) {
			console.error(err);
		}
	});

	const archetype = new Archetype({
		type: req.body.type,
		label: req.body.label,
		image: {
			data: fs.readFileSync(req.file.path),
			contentType: req.file.mimetype
		}
	});

	archetype.save((err, archetype) => {
		if (err) {
			res.status(500).send('Something went wrong.');
		} else {
			res.status(200).send({ message: `${archetype.label} ${archetype.type} was created.` });
		}
	});
};
