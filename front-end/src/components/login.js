import React, { Component } from 'react';
import buttonBackground from '../images/buttonBackground.jpg';

class Login extends Component {
	render() {
		return (
			<form style={this.props.formStyle}>
				<p className="h5">Account Login</p>
				<hr style={{ borderTop: '1px solid #fff', color: '#fff' }} />
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input className="form-control" type="text" />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input className="form-control" type="password" />
				</div>
				<button
					type="submit"
					className="btn btn-default float-right"
					style={{
						backgroundImage: `url(${buttonBackground})`,
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						color: '#BEBEBE'
					}}
				>
					Log in
				</button>
			</form>
		);
	}
}

export default Login;
