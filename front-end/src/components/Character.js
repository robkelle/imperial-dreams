import { Divider, Grid, Paper, Typography } from '@material-ui/core';

import React from 'react';

class Character extends React.Component {
	constructor() {
		super();
		this.state = {
			character: [
				'Character',
				'Character',
				'Character',
				'Character',
				'Character',
				'Character',
				'Character',
				'Character',
				'Character',
				'Character',
				'Character',
				'Character',
				'Character',
				'Character',
				'Character',
				'Character'
			]
		};
	}

	render() {
		return (
			<React.Fragment>
				<Grid container style={{ padding: 20 }}>
					<Grid item xl={12}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
								<Typography variant="h5" gutterBottom={true} style={{ color: '#fff' }}>
									ARCHETYPES
								</Typography>
								<Paper style={{ backgroundColor: '#181818', color: '#fff' }} align="center">
									<Grid container>
										{this.state.character.map((value, index) => {
											return (
												<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
													<img src="https://place-hold.it/150x300/666" />
												</Grid>
											);
										})}
									</Grid>
								</Paper>
							</Grid>
							<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
								<Typography variant="h5" gutterBottom={true} style={{ color: '#fff' }}>
									ARCHETYPE SELECTION
								</Typography>
								<Paper style={{ backgroundColor: '#181818', color: '#fff' }} align="center">
									<Grid container spacing={1}>
										<Grid item xl={12}>
											<img src="https://place-hold.it/600/666" />
										</Grid>
									</Grid>
								</Paper>
							</Grid>
							<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
								<Typography variant="h5" gutterBottom={true} style={{ color: '#fff' }}>
									KNIGHT
								</Typography>
								<Paper style={{ backgroundColor: '#181818', color: '#fff' }} align="center">
									<Grid container spacing={1} align="left" style={{ padding: 10 }}>
										<Grid item xl={12}>
											<Typography variant="h6" gutterBottom style={{ color: '#fff' }}>
												ATTRIBUTES
											</Typography>
											<Divider
												variant="fullWidth"
												style={{ backgroundColor: 'rgb(138, 3, 3)', marginBottom: 10 }}
											/>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">STRENGTH</Typography>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">DEXTERITY</Typography>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">SPIRIT</Typography>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">INTELLECT</Typography>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">ARMOR</Typography>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">MOVEMENT</Typography>
										</Grid>
										<Grid item xl={12}>
											<Typography variant="h6" gutterBottom style={{ color: '#fff' }}>
												STATISTICS
											</Typography>
											<Divider
												variant="fullWidth"
												style={{ backgroundColor: 'rgb(138, 3, 3)', marginBottom: 10 }}
											/>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">WEAPON DAMAGE</Typography>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">WARMTH CONVERSION</Typography>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">CRITICAL HIT CHANCE</Typography>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">DASH COUNT</Typography>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">CRITICAL HIT DAMAGE</Typography>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">LIFE ON HIT</Typography>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">POWER DAMAGE</Typography>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">HEALTH REGEN</Typography>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">POWER COOLDOWN</Typography>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">HUNGER RESISTANCE</Typography>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">FIRE DAMAGE</Typography>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">FIRE RESISTANCE</Typography>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">ICE DAMAGE</Typography>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">ICE RESISTANCE</Typography>
										</Grid>
									</Grid>
								</Paper>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

export { Character };
