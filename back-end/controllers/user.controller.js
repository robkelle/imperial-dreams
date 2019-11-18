import User from '../models/user.model';

exports.signup = (req, res) => {
	let user = new User({
		username: req.body.username,
		password: req.body.password
	});

	user.save((error) => {
		if (error) {
			res.status(500).send({
				message: 'Something went wrong!'
			});
		} else {
			res.status(201).send({
				message: 'User was created.'
			});
		}
	});
};

exports.signin = (req, res) => {
	res.json({ message: 'Need to add controller functionality' });
};
