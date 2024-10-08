// Import API Web Application Framework

import InitSockets from './sockets';
import archetypeRoute from './routes/archetype.route';
import bodyParser from 'body-parser';
import character from './routes/character.route';
import characterArchetype from './routes/characterArchetype.route';
import config from './config.json';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
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
				message: 'MongoDB is running.',
				port: config.DATABASE.DB_PORT,
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

const corsOptions = {
	credentials: true,
	origin: config.ALLOW_ORIGIN
};

app.use(cors(corsOptions));

// API routes
app.use('/api/user/', userRoute);
app.use('/api/', archetypeRoute);
app.use('/api/characterArchetype/', characterArchetype);
app.use('/api/character/', character);

var server = require('http').Server(app);
var io = require('socket.io')(server);

// Start express server
server.listen(port, () => {
	console.log({ message: 'Express is running.', port: port, httpStatus: 200 });
});

// Initialize sockets
const socket = new InitSockets(io);
socket.start();
