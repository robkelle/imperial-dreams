import { Button, Grid, IconButton, Menu, MenuItem, Paper, Typography } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';

import { BufferToBase64 } from './BufferImage';
import MoreHorizontal from '@material-ui/icons/MoreHoriz';
import config from '../../config.json';

const MenuType = (props) => {
	const ITEM_HEIGHT = 48;
	const open = Boolean(props.anchorEl);

	return (
		<div>
			<IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={props.handleClick}>
				<MoreHorizontal style={{ color: '#fff' }} />
			</IconButton>
			<Menu
				id="long-menu"
				anchorEl={props.anchorEl}
				keepMounted
				open={open}
				onClose={props.handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: '20ch'
					}
				}}
			>
				{props.options !== null ? (
					props.options.map((option, index) => (
						<MenuItem key={index} onClick={props.handleClose}>
							{option._id.type}
						</MenuItem>
					))
				) : (
					''
				)}
			</Menu>
		</div>
	);
};

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

const getSelected = (types, props, setSelectedType) => {
	if (types) {
		types.forEach((value, index) => {
			props.characteristics.forEach((characteristic) => {
				if (value.type === characteristic.type && value.label === characteristic.label) {
					setSelectedType(index);
				}
			});
		});
	}
};

const Characteristics = (props) => {
	const [ selectedType, setSelectedType ] = useState(0);
	const [ options, setOptions ] = useState(null);
	const [ anchorEl, setAnchorEl ] = useState(null);
	const [ types, setTypes ] = useState(null);

	// Gets group of types
	const handleClick = (event, props) => {
		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/archetype/groupByType`, {
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
					setOptions(res);
				}
			});

		setAnchorEl(event.currentTarget);
	};

	// Gets all characteristics based on type
	const handleClose = (e, props) => {
		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/archetype/${e.nativeEvent.target.outerText}`, {
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

		setAnchorEl(null);
	};

	const characteristicStyle = (index) => {
		if (index === selectedType) {
			return { backgroundColor: 'rgb(138, 3, 3)', width: '100%', height: '200' };
		}
	};

	useEffect(
		() => {
			getSelected(types, props, setSelectedType);
		},
		[ props, types ]
	);

	return (
		<Fragment>
			<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
				<Typography
					variant="h5"
					gutterBottom={true}
					style={{
						color: '#FFFAF0',
						backgroundColor: 'rgba(24, 24, 24, 0.75)',
						border: 'solid 4px #3CB371',
						borderRadius: 500
					}}
					align="center"
				>
					{props.title}
				</Typography>
				<Paper style={{ backgroundColor: '#181818', color: '#fff' }} align="right">
					<MenuType
						handleClick={(e) => {
							handleClick(e, props);
						}}
						anchorEl={anchorEl}
						handleClose={(e) => {
							handleClose(e, props);
						}}
						options={options}
					/>
					<Grid container>
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
											<img
												src={'data:image/jpeg;base64,' + BufferToBase64(value.image.data.data)}
												width="100%"
												height="200"
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

export { Characteristics };
