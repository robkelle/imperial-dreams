import { Button, FormControl, Input, InputLabel, Paper } from '@material-ui/core';
import React, { useState } from 'react';

const AddArchetype = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('archetypeImage', file);
		formData.append('type', 'hairColor');
		formData.append('label', 'brown');

		fetch('http://localhost:4000/api/archetype', {
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

	return (
		<Paper>
			<form>
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
	);
};

export default AddArchetype;
