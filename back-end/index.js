// Import API Web Application Framework
import express from 'express';

// Import middleware
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Import configuration file
import config from './config.json';

// Import routes
import testRoute from './routes/test.route';
import userRoute from './routes/user.route';

// Connect to mongodb server
mongoose.connect(
	config.DB_SERVER,
	{
		useUnifiedTopology: true,
		useNewUrlParser: true
	},
	(err, db) => {
		if (!err) {
			console.log(`Connected successfully to mongodb server.`);
		} else {
			console.log(`Error connecting to mongodb database server.`);
		}
	}
);

// Initialize web application framework
const app = express();
const port = config.PORT;

// Bind application-level middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// API routes
app.use('/api/', testRoute);
app.use('/api/user/', userRoute);

// Start express server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
