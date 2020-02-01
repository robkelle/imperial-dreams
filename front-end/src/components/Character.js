import { Divider, Grid, LinearProgress, Paper, Typography } from '@material-ui/core';

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
				'Character'
			],
			attributes: [
				{ label: 'STRENGTH', value: 10 },
				{ label: 'DEXTERITY', value: 20 },
				{ label: 'SPIRIT', value: 26 },
				{ label: 'INTELLECT', value: 18 },
				{ label: 'ARMOR', value: 60 },
				{ label: 'MOVEMENT', value: 54 }
			],

			stats: [
				{ label: 'WEAPON DAMAGE', value: '15-25' },
				{ label: 'WARMTH CONVERSION', value: '100%' },
				{ label: 'CRITICAL HIT CHANCE', value: '5%' },
				{ label: 'DASH COUNT', value: '2' },
				{ label: 'CRITICAL HIT DAMAGE', value: '125%' },
				{ label: 'LIFE ON HIT', value: '25' },
				{ label: 'POWER DAMAGE', value: '120%' },
				{ label: 'HEALTH REGEN', value: '10/s' },
				{ label: 'POWER COOLDOWN', value: '-0.5/s' },
				{ label: 'HUNGER RESISTANCE', value: '7%' },
				{ label: 'FIRE DAMAGE', value: '15%' },
				{ label: 'FIRE RESISTANCE', value: '5%' },
				{ label: 'ICE DAMAGE', value: '35%' },
				{ label: 'ICE RESISTANCE', value: '6%' }
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
													<img src="https://place-hold.it/150x250/666" />
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
									INFO
								</Typography>
								<Paper style={{ backgroundColor: '#181818', color: '#fff' }} align="center">
									<Grid container spacing={1} align="left" style={{ padding: 10 }}>
										<Grid item xs={12}>
											<Typography variant="subtitle1" gutterBottom style={{ color: '#fff' }}>
												ATTRIBUTES
											</Typography>
											<Divider
												variant="fullWidth"
												style={{ backgroundColor: 'rgb(138, 3, 3)', marginBottom: 10 }}
											/>
										</Grid>
										{this.state.attributes.map((value) => {
											return (
												<Grid item xl={6}>
													<Grid container spacing={5}>
														<Grid item xl={2}>
															<img src="https://place-hold.it/50/666" />
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
											<Divider
												variant="fullWidth"
												style={{ backgroundColor: 'rgb(138, 3, 3)', marginBottom: 10 }}
											/>
										</Grid>
										{this.state.stats.map((key) => {
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
						</Grid>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

export { Character };
