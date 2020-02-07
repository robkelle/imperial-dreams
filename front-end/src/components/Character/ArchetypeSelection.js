import { Grid, Paper, Typography } from '@material-ui/core';

import React from 'react';

const ArchetypeSelection = (props) => {
	return (
		<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
			<Typography variant="h5" gutterBottom={true} style={{ color: '#fff' }}>
				ARCHETYPE SELECTION
			</Typography>
			<Paper style={{ backgroundColor: '#181818', color: '#fff' }} align="center">
				<Grid container spacing={1}>
					<Grid item xl={12}>
						<img src="https://place-hold.it/600/666" alt="" />
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
};

export { ArchetypeSelection };
