import React, { Component } from 'react';

import favicon from '../images/favicon.ico';

class LoadingScreen extends Component {
	state = {
		percent: 0,
		complete: false
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState.percent < 100) {
			setTimeout(() => {
				this.setState({
					percent: this.state.percent + 1
				});
			}, 10);
		}

		if (prevState.percent === 100) {
			setTimeout(() => {
				this.props.history.push('/user_dashboard');
			}, 1500);

			this.setState({
				complete: true
			});
		}
	}

	componentDidMount() {
		if (this.state.percent < 100) {
			this.setState({
				percent: this.state.percent + 1
			});
		}
	}

	render() {
		return (
			<div
				align="center"
				style={{ backgroundColor: '#181818', height: '100%', width: '100%', position: 'absolute' }}
				className={this.state.complete === false ? '' : 'animated slideOutUp'}
			>
				<div
					style={{
						margin: 0,
						position: 'absolute',
						top: '50%',
						left: '50%',
						width: 400,
						transform: 'translate(-50%, -50%)'
					}}
				>
					<img src={favicon} alt="" />
					<h5 style={{ color: '#fff' }}>Loading...</h5>
					<div className="row">
						<div
							style={{
								width: `${this.state.percent}%`,
								backgroundColor: '#8a0303',
								height: 50
							}}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export { LoadingScreen };
