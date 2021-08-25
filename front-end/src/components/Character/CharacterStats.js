import { Button, Collapse, Divider, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
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
		<Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
			<Typography
				variant="h6"
				gutterBottom={true}
        className="texture2"
					style={{
            padding: '10px'
					}}
				align="center"
			>
				{props.title}
			</Typography>
			<Paper className="texture" align="center">
				<Grid container align="left" style={{ padding: 5 }}>
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
								minimizeCharacteristics ? setMinimizeCharacteristics(false) : setMinimizeCharacteristics(true);
							}}
						>
							<Typography variant="subtitle1" gutterBottom style={{ color: '#fff' }}>
								CHARACTERISTICS
							</Typography>
						</Button>

						<Divider variant="fullWidth" style={{ backgroundColor: 'rgb(138, 3, 3)', marginBottom: 10 }} />
					</Grid>

					<Grid item xs={6}>
						<Collapse in={minimizeCharacteristics}>
							<Table>
								{props.characteristics.map((value, index) => (
									<TableBody key={index}>
										<TableRow>
											<TableCell style={{ color: '#fff', border: 'none' }}>{value.type}</TableCell>
											<TableCell style={{ color: '#fff', border: 'none' }}>{value.label}</TableCell>
										</TableRow>
									</TableBody>
								))}
							</Table>
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
					<Grid item xs={6}>
						<Collapse in={minimizeStatistics}>
							<Table>
								{props.stats.map((value, index) => (
									<TableBody key={index}>
										<TableRow>
											<TableCell style={{ color: '#fff', border: 'none' }}>{value.label}</TableCell>
											<TableCell style={{ color: '#fff', border: 'none' }}>{value.value}</TableCell>
										</TableRow>
									</TableBody>
								))}
							</Table>
						</Collapse>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
};

export { CharacterStats };
