import { Avatar, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import React, { Component, Fragment } from 'react';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AttachFileIcon from '@material-ui/icons/Attachment';
import { BufferToBase64 } from './BufferImage';
import config from '../../config.json';

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
				this.getProfileImage();
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
				this.setState({
					image: res.profileImage
				});
			});
	};

	componentDidMount() {
		this.getProfileImage();
	}

	render() {
		return (
			<Fragment>
				<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
					<Typography variant="h5" gutterBottom={true} style={{ color: '#fff' }}>
						{this.props.title}
					</Typography>
					<Paper style={{ backgroundColor: '#181818', color: '#fff' }} align="center">
						<div align="right">
							<IconButton variant="contained" component="label" color="secondary">
								<AttachFileIcon />

								<input
									type="file"
									style={{ display: 'none' }}
									onChange={(e) => {
										this.addProfileImage(e.target.files[0], this.props.cookies.cookies._id);
									}}
								/>
							</IconButton>
						</div>
						<Grid container spacing={1}>
							<Grid item xl={12}>
								{this.state.image ? (
									<Avatar
										style={{ width: 400, height: 350 }}
										src={'data:image/jpeg;base64,' + BufferToBase64(this.state.image.data.data)}
									/>
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
