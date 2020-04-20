import { Button, Grid, Paper, Typography } from '@material-ui/core';
import React, { Fragment, useState } from 'react';

import { Authenticator } from '../Authentication/AuthenticatorContext';
import config from '../../config.json';

const arrayBufferToBase64 = (buffer) => {
	var binary = '';
	var bytes = [].slice.call(new Uint8Array(buffer));
	bytes.forEach((b) => (binary += String.fromCharCode(b)));
	return window.btoa(binary);
};

const addCharacterType = async (type, label, userID, props) => {
	await fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/character/${type}/${label}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			userID: userID
		})
	}).then(async (res) => {
		props.selectedArchetype(userID);
	});
};

const Archetype = (props) => {
	const [ userID, setUserID ] = useState(0);
	return (
		<Fragment>
			<Authenticator.Consumer>
				{(props) => {
					setUserID(props.userID);
				}}
			</Authenticator.Consumer>
			<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
				<Typography variant="h5" gutterBottom={true} style={{ color: '#fff' }}>
					{props.title}
				</Typography>
				<Paper style={{ backgroundColor: '#181818', color: '#fff' }} align="center">
					<Grid container>
						{props.selectedType ? (
							props.selectedType.map((value, index) => {
								return (
									<Grid item xs={3} sm={3} md={3} lg={3} xl={3} key={index}>
										<Button
											onClick={() => {
												addCharacterType(value.type, value.label, userID, props);
											}}
										>
											<img
												src={
													'data:image/jpeg;base64,' +
													arrayBufferToBase64(value.image.data.data)
												}
												width="110"
												height="250"
												alt=""
											/>
										</Button>
									</Grid>
								);
							})
						) : (
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								<div align="left" style={{ height: 250, width: '100%', color: '#fff' }} />
							</Grid>
						)}
					</Grid>
				</Paper>
			</Grid>
		</Fragment>
	);
};

export { Archetype };
