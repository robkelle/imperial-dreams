const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.set('json spaces', 2);
app.use(cors());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(bodyParser.json());
const example = require('./routes/example.route');

app.use('/api/example/', example);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
