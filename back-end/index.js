import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import example from './routes/example.route';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/example', example);

app.listen(4000, () => {
	console.log('Server is running on port 4000');
});
