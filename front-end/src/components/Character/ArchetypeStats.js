import { Button, Collapse, Divider, Grid, LinearProgress, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';

const ArchetypeStats = (props) => {
	const [ minimizeCharacteristis, setMinimizeCharacteristics ] = useState(true);
	const [ minimizeStatistics, setminimizeStatistics ] = useState(false);

	return (
		<Grid item xs={12} sm={12} md={3} lg={4} xl={4}>
			<Typography variant="h5" gutterBottom={true} style={{ color: '#fff' }}>
				{props.title}
			</Typography>
			<Paper style={{ backgroundColor: '#181818', color: '#fff' }} align="center">
				<Grid container spacing={1} align="left" style={{ padding: 10 }}>
					<Grid item xs={12}>
						<Typography variant="subtitle1" gutterBottom style={{ color: '#fff' }}>
							{props.title}
						</Typography>
						<Divider variant="fullWidth" style={{ backgroundColor: 'rgb(138, 3, 3)', marginBottom: 10 }} />
					</Grid>
					{props.attributes.map((value, index) => {
						return (
							<Grid item xl={6} key={index}>
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
						<Button
							style={{ color: '#fff', backgroundColor: 'rgb(138, 3, 3)' }}
							onClick={() => {
								minimizeCharacteristis
									? setMinimizeCharacteristics(false)
									: setMinimizeCharacteristics(true);
							}}
						>
							<Typography variant="subtitle1" gutterBottom style={{ color: '#fff' }}>
								CHARACTERISTICS
							</Typography>
						</Button>

						<Divider variant="fullWidth" style={{ backgroundColor: 'rgb(138, 3, 3)', marginBottom: 10 }} />
					</Grid>
					<Grid item xl={6}>
						<Collapse in={minimizeCharacteristis}>
							<Grid container justify="space-evenly">
								<Grid item xl={6}>
									<Typography variant="overline">EYES</Typography>
								</Grid>
								<Grid item xl={6}>
									<Typography variant="overline">
										{props.eyes !== undefined ? props.eyes.eyes : '---'}
									</Typography>
								</Grid>
								<Grid item xl={6}>
									<Typography variant="overline">HAIR</Typography>
								</Grid>
								<Grid item xl={6}>
									<Typography variant="overline">
										{props.hair !== undefined ? props.hair.hair : '---'}
									</Typography>
								</Grid>
								<Grid item xl={6}>
									<Typography variant="overline">RACE</Typography>
								</Grid>
								<Grid item xl={6}>
									<Typography variant="overline">
										{props.race !== undefined ? props.race.race : '---'}
									</Typography>
								</Grid>
								<Grid item xl={6}>
									<Typography variant="overline">MOUTH</Typography>
								</Grid>
								<Grid item xl={6}>
									<Typography variant="overline">
										{props.mouth !== undefined ? props.mouth.mouth : '---'}
									</Typography>
								</Grid>
								<Grid item xl={6}>
									<Typography variant="overline">PROFESSION</Typography>
								</Grid>{' '}
								<Grid item xl={6}>
									<Typography variant="overline">
										{props.profession !== undefined ? props.profession.profession : '---'}
									</Typography>
								</Grid>
							</Grid>
						</Collapse>
					</Grid>

					<Grid item xs={12}>
						<Button
							style={{ color: '#fff', backgroundColor: 'rgb(138, 3, 3)' }}
							onClick={() => {
								minimizeStatistics ? setminimizeStatistics(false) : setminimizeStatistics(true);
							}}
						>
							<Typography variant="subtitle1" gutterBottom style={{ color: '#fff' }}>
								STATISTICS
							</Typography>
						</Button>
						<Divider variant="fullWidth" style={{ backgroundColor: 'rgb(138, 3, 3)', marginBottom: 10 }} />
					</Grid>
					{props.stats.map((key, index) => {
						return (
							<Grid item xl={6} key={index}>
								<Collapse in={minimizeStatistics}>
									<Grid container justify="space-evenly">
										<Grid item xl={6}>
											<Typography variant="overline">{key.label}</Typography>
										</Grid>
										<Grid item xl={2}>
											<Typography variant="overline">{key.value}</Typography>
										</Grid>
									</Grid>
								</Collapse>
							</Grid>
						);
					})}
				</Grid>
			</Paper>
		</Grid>
	);
};

export { ArchetypeStats };
