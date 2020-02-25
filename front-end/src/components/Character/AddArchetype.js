import { Button, FormControl, Input, InputLabel, Paper } from '@material-ui/core';

import React from 'react';

const AdminDashboard = () => {
	return (
		<div>
			<Paper>
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
			</Paper>
		</div>
	);
};

export default AdminDashboard;
