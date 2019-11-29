import React, { Component } from 'react';

class LoadingScreen extends Component {
	state = {
		count: 0,
		complete: false
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState.count < 100) {
			setTimeout(() => {
				this.setState({
					count: this.state.count + 1
				});
			}, 10);
		}

		if (prevState.count === 100) {
			setTimeout(() => {
				this.props.history.push('/user_dashboard');
			}, 700);

			this.setState({
				complete: true
			});
		}
	}

	componentDidMount() {
		if (this.state.count < 100) {
			this.setState({
				count: this.state.count + 1
			});
		}
	}

	render() {
		return (
			<div>
				{this.state.complete === false ? (
					<div style={{ backgroundColor: '#000', height: '100%', width: '100%', position: 'absolute' }}>
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
							<h5 style={{ color: '#fff' }}>Loading...</h5>
							<div className="row">
								<div
									style={{
										width: `${this.state.count}%`,
										backgroundColor: 'rgb(0, 51, 102)',
										height: 50
									}}
								/>
							</div>
						</div>
					</div>
				) : (
					<div
						className="animated slideOutDown"
						style={{ backgroundColor: '#000', height: '100%', width: '100%', position: 'absolute' }}
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
							<h5 style={{ color: '#fff' }}>Loading...</h5>
							<div className="row">
								<div
									style={{
										width: `${this.state.count}%`,
										backgroundColor: 'rgb(0, 51, 102)',
										height: 50
									}}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default LoadingScreen;
