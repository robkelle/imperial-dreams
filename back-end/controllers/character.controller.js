import Character from '../models/character.model';

exports.postCharacterSettings = (req, res) => {
	class CharacterSettings {
		constructor(type, label, user) {
			this.type = type;
			this.label = label;
			this.user = user;
		}

		/**
      @name updateType

      @description Inserts or updates the character setting

      @returns {type} description
    */
		updateType() {
			Character.findOneAndUpdate(
				{ type: this.type, userID: this.user },
				{ type: this.type, label: this.label, userID: this.user },
				{ upsert: 'true' },
				(err) => {
					if (err) {
					} else {
					}
				}
			);
		}
	}

	new CharacterSettings(req.params.type, req.params.label, req.body.userID).updateType();

	res.status(200).send();
};

exports.getCharacterSettings = (req, res) => {
	Character.find({ userID: req.params.user }, '', (err, data) => {
		if (!err) {
			res.status(200).send(data);
		}
	});
};
