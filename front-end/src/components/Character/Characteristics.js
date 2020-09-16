import { Button, Grid, Paper, Typography } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';

import { Authenticator } from '../Authentication/AuthenticatorContext';
import { BufferToBase64 } from './BufferImage';
import config from '../../config.json';

const addCharacterType = async (type, label, userID, props) => {
	await fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/characterArchetype/${type}/${label}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			userID: userID
		})
	}).then(async (res) => {
		props.selectedType(userID);
	});
};

const getSelected = (props, setSelectedType) => {
	if (props.types) {
		props.types.forEach((value, index) => {
			props.characteristics.forEach((characteristic) => {
				if (value.type === characteristic.type && value.label === characteristic.label) {
					setSelectedType(index);
				}
			});
		});
	}
};

const Characteristics = (props) => {
	const [ userID, setUserID ] = useState(0);
	const [ selectedType, setSelectedType ] = useState(null);

	const characteristicStyle = (index) => {
		if (index === selectedType) {
			return { border: 'solid 8px rgb(138, 3, 3)', borderRadius: 8 };
		}
	};

	useEffect(
		() => {
			getSelected(props, setSelectedType);
		},
		[ props ]
	);

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
						{props.types ? (
							props.types.map((value, index) => {
								return (
									<Grid item xs={3} sm={3} md={3} lg={3} xl={3} key={index}>
										<Button
											onClick={() => {
												addCharacterType(value.type, value.label, userID, props);
											}}
											color="default"
										>
											<img
												src={'data:image/jpeg;base64,' + BufferToBase64(value.image.data.data)}
												width="90"
												height="180"
												alt=""
                        style={characteristicStyle(index)}
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

export { Characteristics };
