import Character from '../models/character.model';
import fs from 'fs';
import fsExtra from 'fs-extra';

exports.postCharacterImage = (req, res) => {
	fsExtra.emptyDir('uploads', (err) => {
		if (err) {
			console.error(err);
		}
	});

	Character.findOneAndUpdate(
		{ userID: req.body.userID },
		{
			userID: req.body.userID,
			profileImage: {
				data: fs.readFileSync(req.file.path),
				contentType: req.file.mimetype
			}
		},
		{ upsert: 'true' },
		(err, data) => {
			if (err) {
				console.log(err);
			} else {
				res.status(200).send({ status: 200 });
			}
		}
	);
};

exports.getProfileImage = (req, res) => {
	Character.findOne({ userID: req.params.userID }, (err, data) => {
		if (data === null) {
			res.status(400).send({ status: 400 });
		} else {
			res.status(200).send(data);
		}
	});
};
