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
			return { background: 'green' };
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
			<Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
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
				<Paper className="texture" style={{ position: 'relative' }}>
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

					<div style={{ marginLeft: 170 }}>
						{types ? (
							types.map((value, index) => {
								return (
									<Grid container item xs={12} sm={6} md={6} lg={4} xl={3} key={index} style={{ display: 'inline-flex' }}>
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
					</div>
				</Paper>
			</Grid>
		</Fragment>
	);
};

export { Characteristics };
