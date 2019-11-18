// Import API Web Application Framework
import express from 'express';

// Import middleware
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// Import configuration file
import config from './config.json';

// Import routes
import testRoute from './routes/test.route';
import userRoute from './routes/user.route';

// Connect to mongodb server
mongoose.connect(
	config.DATABASE.DB_HOST + ':' + config.DATABASE.DB_PORT + '/' + config.DATABASE.DB_NAME,
	{
		useUnifiedTopology: true,
		useNewUrlParser: true
	},
	(err) => {
		if (!err) {
			console.log({
				message: `Successfully connected to ${config.DATABASE.DB}.`,
				httpStatus: 200
			});
		} else {
			console.log({
				message: `Failed to connect to ${config.DATABASE.DB}.`,
				httpStatus: 500
			});
		}
	}
);

// Initialize web application framework
const app = express();
const port = config.EXPRESS.PORT;

// Bind application-level middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// API routes
app.use('/api/', testRoute);
app.use('/api/user/', userRoute);

// Start express server
app.listen(port, () => {
	console.log({ message: `Express is running on port ${port}`, httpStatus: 200 });
});
