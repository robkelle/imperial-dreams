import { Button, Collapse, Divider, Grid, LinearProgress, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: 'rgb(138, 3, 3)'
		},
		secondary: {
			main: '#fff'
		}
	}
});

const CharacterStats = (props) => {
	const [ minimizeCharacteristics, setMinimizeCharacteristics ] = useState(true);
	const [ minimizeStatistics, setMinimizeStatistics ] = useState(true);

	return (
		<Grid item xs={12} sm={12} md={5} lg={5} xl={5} style={{ padding: 5 }}>
			<Typography
				variant="h5"
				gutterBottom={true}
				style={{
					color: '#FFFAF0',
					backgroundColor: 'rgba(24, 24, 24, 0.75)',
					border: 'solid 4px #3CB371',
					borderRadius: 500
				}}
				align="center"
			>
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
								<Grid container spacing={0}>
									<Grid item xl={2}>
										<img src={value.image} alt="stats" style={{ height: 50, width: 50 }} />
									</Grid>
									<Grid item xs={10}>
										<Typography variant="overline" style={{ marginLeft: 5 }}>
											{value.label}
										</Typography>
										<ThemeProvider theme={theme}>
											<LinearProgress variant="determinate" color="primary" value={value.value} />
										</ThemeProvider>
									</Grid>
								</Grid>
							</Grid>
						);
					})}
					<Grid item xs={12}>
						<Button
							style={{ color: '#fff', backgroundColor: 'rgb(138, 3, 3)', marginTop: 15 }}
							onClick={() => {
								minimizeCharacteristics
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
						<Collapse in={minimizeCharacteristics}>
							{props.characteristics.map((value, index) => {
								return (
									<Grid container justify="space-evenly" key={index}>
										<Grid item xl={6}>
											<Typography variant="overline">{value.type}</Typography>
										</Grid>
										<Grid item xl={6}>
											<Typography variant="overline">{value.label}</Typography>
										</Grid>
									</Grid>
								);
							})}
						</Collapse>
					</Grid>

					<Grid item xs={12}>
						<Button
							style={{ color: '#fff', backgroundColor: 'rgb(138, 3, 3)' }}
							onClick={() => {
								minimizeStatistics ? setMinimizeStatistics(false) : setMinimizeStatistics(true);
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

export { CharacterStats };
