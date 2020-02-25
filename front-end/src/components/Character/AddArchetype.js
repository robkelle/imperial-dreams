import { Button, FormControl, Input, InputLabel, Paper } from '@material-ui/core';

import React from 'react';

const AddArchetype = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e.target);
	};

	return (
		<Paper>
			<form onSubmit={(e) => handleSubmit(e)}>
				<FormControl>
					<InputLabel id="type">Type</InputLabel>
					<Input />
				</FormControl>
				<FormControl>
					<InputLabel type="label">Label</InputLabel>
					<Input />
				</FormControl>
				<FormControl>
					<Button variant="contained" component="label">
						Upload File
						<input type="file" style={{ display: 'none' }} />
					</Button>
				</FormControl>
				<FormControl>
					<Button variant="contained" type="submit">
						Submit
					</Button>
				</FormControl>
			</form>
		</Paper>
	);
};

export default AddArchetype;
