import { Grid, Paper, Typography } from '@material-ui/core';

import React from 'react';

const ArchetypeSelection = (props) => {
	return (
		<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
			<Typography variant="h5" gutterBottom={true} style={{ color: '#fff' }}>
				{props.title}
			</Typography>
			<Paper style={{ backgroundColor: '#181818', color: '#fff' }} align="center">
				<Grid container spacing={1}>
					<Grid item xl={12}>
						<div style={{ width: 666, height: 400 }} />
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
};

export { ArchetypeSelection };
