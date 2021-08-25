import { Avatar, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import React, { Component, Fragment } from 'react';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AttachFileIcon from '@material-ui/icons/Attachment';
import { BufferToBase64 } from './BufferImage';
import { ThemeProvider } from '@material-ui/styles';
import config from '../../config.json';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: 'rgb(138, 3, 3)'
		},
		secondary: {
			main: '#fff'
		}
	}
});

class CharacterProfile extends Component {
	constructor() {
		super();
		this.state = {
			image: null
		};
	}

	addProfileImage = (file, userID) => {
		let formData = new FormData();
		formData.append('characterImage', file);
		formData.append('userID', userID);

		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/character`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: formData
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				if (res.httpStatus === 401) {
					this.props.cookies.remove('isAuthorized', { path: '/' });
				} else {
					this.getProfileImage();
				}
			});
	};

	getProfileImage = () => {
		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/character/${this.props.cookies.cookies._id}`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include'
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				if (res.httpStatus === 401) {
					this.props.cookies.remove('isAuthorized', { path: '/' });
				} else {
					this.setState({
						image: res.profileImage
					});
				}
			});
	};

	componentDidMount() {
		this.getProfileImage();
	}

	componentWillUnmount() {
		this.setState({
			image: null
		});
	}

	render() {
		return (
			<Fragment>
				<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
					<Typography
						variant="h6"
						gutterBottom={true}
						className="texture2"
						style={{
							padding: '10px'
						}}
						align="center"
					>
						{this.props.title}
					</Typography>
					<Paper className="texture" align="center">
						<div align="right">
							<ThemeProvider theme={theme}>
								<IconButton variant="contained" component="label" color="primary">
									<AttachFileIcon />

									<input
										type="file"
										style={{ display: 'none' }}
										onChange={(e) => {
											this.addProfileImage(e.target.files[0], this.props.cookies.cookies._id);
										}}
									/>
								</IconButton>
							</ThemeProvider>
						</div>
						<Grid container spacing={1} justify="center">
							<Grid item xl={12}>
								{this.state.image ? (
									<Avatar style={{ width: '100%', height: 'auto' }} src={'data:image/jpeg;base64,' + BufferToBase64(this.state.image.data.data)} />
								) : (
									<Avatar style={{ width: 400, height: 350 }}>
										<AccountCircleIcon style={{ width: 400, height: 350, color: '#181818' }} />
									</Avatar>
								)}
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Fragment>
		);
	}
}

export { CharacterProfile };
