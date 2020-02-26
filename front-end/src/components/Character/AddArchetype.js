import { Button, FormControl, Grid, Input, InputLabel, Paper } from '@material-ui/core';
import React, { useState } from 'react';

import config from '../../config.json';

const AddArchetype = () => {
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
				console.log(res);
			});
	};

	const [ file, setFile ] = useState();
	const [ type, setType ] = useState();
	const [ label, setLabel ] = useState();

	return (
		<div width="100%" style={{ marginTop: 20 }}>
			<Grid container justify="center">
				<Grid item>
					<Paper style={{ padding: 10 }}>
						<form>
							<div>
								<FormControl>
									<InputLabel id="type">Type</InputLabel>
									<Input onChange={(e) => setType(e.target.value)} />
								</FormControl>
							</div>
							<div>
								<FormControl>
									<InputLabel type="label">Label</InputLabel>
									<Input onChange={(e) => setLabel(e.target.value)} />
								</FormControl>
							</div>
							<br />
							<FormControl>
								<Button variant="contained" component="label">
									Upload File
									<input
										type="file"
										style={{ display: 'none' }}
										onChange={(e) => {
											setFile(e.target.files[0]);
										}}
									/>
								</Button>
							</FormControl>

							<FormControl>
								<Button variant="contained" type="submit" onClick={(e) => handleSubmit(e)}>
									Submit
								</Button>
							</FormControl>
						</form>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default AddArchetype;
