import { Avatar, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AttachFileIcon from '@material-ui/icons/Attachment';

const ArchetypeSelection = (props) => {
	const [ file, setFile ] = useState(null);

	return (
		<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
			<Typography variant="h5" gutterBottom={true} style={{ color: '#fff' }}>
				{props.title}
			</Typography>
			<Paper style={{ backgroundColor: '#181818', color: '#fff' }} align="center">
				<div align="right">
					<IconButton variant="contained" component="label" color="secondary">
						<AttachFileIcon />

						<input
							type="file"
							style={{ display: 'none' }}
							onChange={(e) => {
								console.log(e.target.files);
								setFile(e.target.files[0]);
							}}
						/>
					</IconButton>
				</div>
				<Grid container spacing={1}>
					<Grid item xl={12}>
						<Avatar style={{ width: 400, height: 350 }}>
							<AccountCircleIcon style={{ width: 400, height: 350, color: '#181818' }} />
						</Avatar>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
};

export { ArchetypeSelection };
