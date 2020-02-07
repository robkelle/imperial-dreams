import { Divider, Grid, LinearProgress, Paper, Typography } from '@material-ui/core';

import React from 'react';

const ArchetypeStats = (props) => {
	return (
		<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
			<Typography variant="h5" gutterBottom={true} style={{ color: '#fff' }}>
				INFO
			</Typography>
			<Paper style={{ backgroundColor: '#181818', color: '#fff' }} align="center">
				<Grid container spacing={1} align="left" style={{ padding: 10 }}>
					<Grid item xs={12}>
						<Typography variant="subtitle1" gutterBottom style={{ color: '#fff' }}>
							{props.title}
						</Typography>
						<Divider variant="fullWidth" style={{ backgroundColor: 'rgb(138, 3, 3)', marginBottom: 10 }} />
					</Grid>
					{props.attributes.map((value) => {
						return (
							<Grid item xl={6}>
								<Grid container spacing={5}>
									<Grid item xl={2}>
										<img src="https://place-hold.it/50/666" alt="" />
									</Grid>
									<Grid item xs={10}>
										<Typography variant="overline">{value.label}</Typography>
										<LinearProgress variant="determinate" value={value.value} />
									</Grid>
								</Grid>
							</Grid>
						);
					})}
					<Grid item xs={12}>
						<Typography variant="subtitle1" gutterBottom style={{ color: '#fff' }}>
							STATISTICS
						</Typography>
						<Divider variant="fullWidth" style={{ backgroundColor: 'rgb(138, 3, 3)', marginBottom: 10 }} />
					</Grid>
					{props.stats.map((key) => {
						return (
							<Grid item xl={6}>
								<Grid container justify="space-evenly">
									<Grid item xl={6}>
										<Typography variant="overline">{key.label}</Typography>
									</Grid>
									<Grid item xl={2}>
										<Typography variant="overline">{key.value}</Typography>
									</Grid>
								</Grid>
							</Grid>
						);
					})}
				</Grid>
			</Paper>
		</Grid>
	);
};

export { ArchetypeStats };
