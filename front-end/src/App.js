import React from 'react';
import Login from './components/login';
import './App.css';

function App() {
	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<Login
						formStyle={{
							backgroundColor: 'rgba(0, 51, 102, .55)',
							padding: '10px 35px 60px 35px',
							color: '#BEBEBE',
							marginTop: 10,
							width: '80%'
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
