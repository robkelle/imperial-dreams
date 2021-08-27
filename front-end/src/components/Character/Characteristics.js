import { Button, Grid, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';

import { BufferToBase64 } from './BufferImage';
import config from '../../config.json';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	wrapper: {
		alignItems: 'baseline'
	}
});

const addCharacterType = async (type, label, props) => {
	await fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/characterArchetype/${type}/${label}`, {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			userID: props.cookies.cookies._id
		})
	}).then(async (res) => {
		props.selectedType(props.cookies.cookies._id);
	});
};

const Characteristics = (props) => {
	const [ selectedType, setSelectedType ] = useState(0);
	const [ types, setTypes ] = useState(null);
	const [ tabValue, setTabValue ] = useState('Eye Color');
	const [ defaultType, setDefaultType ] = useState(true);

	const classes = useStyles();

	const getSelected = (types, props, setSelectedType) => {
		if (types) {
			types.forEach((value, index) => {
				props.userCharacteristics.forEach((characteristic) => {
					if (value.type === characteristic.type && value.label === characteristic.label) {
						setSelectedType(index);
					}
				});
			});
		} else {
			// Set default on page load
		}
	};

	const getDefaultType = (value, props) => {
		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/archetype/${value}`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				if (res.httpStatus === 401) {
					props.cookies.remove('isAuthorized', { path: '/' });
				} else {
					setTypes(res);
					setDefaultType(false);
				}
			});
	};

	const characteristicStyle = (index) => {
		if (index === selectedType) {
			return { backgroundColor: 'rgb(138, 3, 3)', width: '100%', height: '200' };
		}
	};

	useEffect(
		() => {
			getSelected(types, props, setSelectedType);

			props.types.map((value, index) => {
				if (index === 0 && defaultType) {
					getDefaultType(value._id.type, props);
				}

				return true;
			});
		},
		[ types, props, defaultType ]
	);

	return (
		<Fragment>
			<Grid item xs={4}>
				<Typography
					variant="h6"
					gutterBottom={true}
					className="texture2"
					style={{
						padding: '10px'
					}}
					align="center"
				>
					{props.title}
				</Typography>
				<Paper className="texture" style={{ position: 'relative', height: '80%' }}>
					<div className="sidebar">
						<Tabs
							TabIndicatorProps={{ style: { backgroundColor: '#e6e8ea' } }}
							orientation="vertical"
							value={tabValue}
							onChange={(e, value) => {
								setTabValue(value);

								fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/archetype/${value}`, {
									method: 'GET',
									mode: 'cors',
									credentials: 'include',
									headers: {
										'Content-Type': 'application/json'
									}
								})
									.then((res) => {
										return res.json();
									})
									.then((res) => {
										if (res.httpStatus === 401) {
											props.cookies.remove('isAuthorized', { path: '/' });
										} else {
											setTypes(res);
										}
									});
							}}
						>
							{props.types.map((value, index) => <Tab classes={classes} key={index} label={value._id.type} value={value._id.type} />)}
						</Tabs>
					</div>

					<Grid item xs={12} style={{ marginLeft: 200, display: 'flex' }}>
						{types ? (
							types.map((value, index) => {
								return (
									<Grid item xs={3} sm={3} md={3} lg={3} xl={3} key={index}>
										<Button
											onClick={() => {
												addCharacterType(value.type, value.label, props);
											}}
											style={characteristicStyle(index)}
										>
											<img src={'data:image/jpeg;base64,' + BufferToBase64(value.image.data.data)} width="100%" height="200" alt="" />
										</Button>
									</Grid>
								);
							})
						) : (
							<Fragment />
						)}
					</Grid>
				</Paper>
			</Grid>
		</Fragment>
	);
};

export { Characteristics };
