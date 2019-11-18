// API Web App Framework
import express from 'express';

// Middleware
import cors from 'cors';
import bodyParser from 'body-parser';

// Configuration file
import config from './config.json';

// Routes
import testRoute from './routes/test.route';
import userRoute from './routes/user.route';

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
