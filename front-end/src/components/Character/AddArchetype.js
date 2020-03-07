import { Badge, Button, FormControl, Grid, Input, InputLabel, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import config from '../../config.json';

const AddArchetype = () => {
	const [ file, setFile ] = useState();
	const [ type, setType ] = useState();
	const [ label, setLabel ] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('archetypeImage', file);
		formData.append('type', type);
		formData.append('label', label);

		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/archetype`, {
			method: 'POST',
			body: formData
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				// Clear form values on submission
				setLabel('');
				setType('');
				setFile(undefined);
			});
	};

	return (
		<Grid container justify="center" style={{ marginTop: 20 }}>
			<Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
				<Paper style={{ padding: 10 }}>
					<Typography variant="subtitle1">Add Archetype</Typography>
					<form>
						<div>
							<FormControl fullWidth>
								<InputLabel id="type">Type</InputLabel>
								<Input onChange={(e) => setType(e.target.value)} value={type} />
							</FormControl>
						</div>
						<div>
							<FormControl fullWidth>
								<InputLabel type="label">Label</InputLabel>
								<Input onChange={(e) => setLabel(e.target.value)} value={label} />
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
						<FormControl fullWidth style={{ marginTop: 10 }}>
							<Button
								variant="contained"
								color="primary"
								type="submit"
								onClick={(e) => handleSubmit(e)}
								disabled={file === undefined ? true : false}
							>
								Submit
							</Button>
						</FormControl>
					</form>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default AddArchetype;
