const express = require('express');

exports.postExample = (req, res) => {
	res.status(200).send({ message: 'This worked!' });
};
