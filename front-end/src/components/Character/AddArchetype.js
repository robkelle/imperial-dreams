import {
	Avatar,
	Badge,
	Button,
	Divider,
	FormControl,
	Grid,
	IconButton,
	Input,
	InputLabel,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	MenuItem,
	Paper,
	Select
} from '@material-ui/core';
import React, { useState } from 'react';

import { BufferToBase64 } from './BufferImage';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import config from '../../config.json';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper
	}
}));


const AddArchetype = () => {
	const [ file, setFile ] = useState();
	const [ type, setType ] = useState();
	const [ label, setLabel ] = useState();
	const [ labelValues, setLabelValues ] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('archetypeImage', file);
		formData.append('type', type);
		formData.append('label', label);

		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/archetype`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: formData
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				getTypes(type);
				// Clear form values on submission
				setLabel('');
				setType('');
				setFile(undefined);
			});
	};

	const getTypes = (e) => {
		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/archetype/${e}`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include'
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				setLabelValues(res);
			});
	};

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250
			}
		}
	};

	const types = [
		'Eye Color',
		'Eyebrows',
		'Skin Color',
		'Face Structure',
		'Nose',
		'Mouth',
		'Facial Hair',
		'Hair Color',
		'Body Type',
		'Hands'
	];

	return (
		<Grid container justify="center" style={{ marginTop: 20 }}>
			<Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
				<Paper style={{ padding: 10 }}>
					<form>
						<div>
							<FormControl fullWidth>
								<InputLabel id="type">Type</InputLabel>
								<Select
									onChange={(e) => {
										setType(e.target.value);
										getTypes(e.target.value);
									}}
									value={type || ''}
									MenuProps={MenuProps}
								>
									{types.map((name) => (
										<MenuItem key={name} value={name}>
											{name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
						<div>
							<FormControl fullWidth>
								<InputLabel type="label">Label</InputLabel>
								<Input onChange={(e) => setLabel(e.target.value)} value={label || ''} />
							</FormControl>
						</div>
						<FormControl fullWidth style={{ marginTop: 20 }}>
							<Button variant="contained" component="label">
								{file === undefined ? (
									'Upload File'
								) : (
									<Badge badgeContent={1} color="primary">
										Upload File
									</Badge>
								)}
								<input
									type="file"
									style={{ display: 'none' }}
									onChange={(e) => {
										setFile(e.target.files[0]);
									}}
								/>
							</Button>
						</FormControl>
						{file !== undefined ? (
							<FormControl fullWidth style={{ marginTop: 20 }}>
								<Button
									variant="contained"
									component="label"
									onClick={(e) => {
										setFile(undefined);
									}}
									style={{ backgroundColor: 'rgb(138, 3, 3)', color: '#fff' }}
								>
									Remove File
								</Button>
							</FormControl>
						) : (
							''
						)}
						<FormControl fullWidth style={{ marginTop: 10 }}>
							<Button
								variant="contained"
								color="default"
								type="submit"
								onClick={(e) => handleSubmit(e)}
								disabled={
									file === undefined || type === undefined || label === undefined || label === '' ? (
										true
									) : (
										false
									)
								}
							>
								Submit
							</Button>
						</FormControl>
					</form>
				</Paper>
			</Grid>

			<RemoveArchetype
				label={labelValues}
				get={(props) => {
					getTypes(props);
				}}
			/>
		</Grid>
	);
};

const RemoveArchetype = (props) => {
	let deleteArchetype = (value) => {
		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/archetype/${value._id}`, {
			method: 'DELETE',
			mode: 'cors',
			credentials: 'include'
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
        props.get(value.type);
      });
	};

	const classes = useStyles();

	return (
		<Grid item xl={3} lg={3} md={3} sm={3} xs={3} style={{marginLeft: 12}}>
			{props.label !== null ? (
				<Paper style={{ padding: 10 }}>
					{props.label.map((value, index) => {
						return (
							<List key={index} className={classes.root}>
								<ListItem>
									<ListItemAvatar>
										<Avatar variant="square">
											<img
												src={
													'data:image/jpeg;base64,' +
													BufferToBase64(value.image.data.data)
												}
                        alt="Archetype"
											/>
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary={value.label} />
									<ListItemSecondaryAction>
										<IconButton
											edge="end"
											aria-label="delete"
											onClick={() => {
												deleteArchetype(value);
											}}
										>
											<DeleteForeverIcon />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
								{index === props.label.length - 1 || props.label.length === 1 ? '' : <Divider />}
							</List>
						);
					})}
				</Paper>
			) : (
				''
			)}
		</Grid>
	);
};

export default AddArchetype;
