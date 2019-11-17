import React from 'react';
import Login from './components/login';
import './App.css';

const classes = {
	formStyle: {
		backgroundColor: 'rgba(0, 51, 102, .55)',
		padding: '10px 35px 60px 35px',
		color: '#BEBEBE',
		marginTop: 10,
		width: '65%',
		fontSize: 16
	},
	hrStyle: {
		borderTop: '1px solid #fff',
		color: '#fff'
	}
};

function App() {
	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<Login formStyle={classes.formStyle} hrStyle={classes.hrStyle} />
				</div>
			</div>
		</div>
	);
}

export default App;
