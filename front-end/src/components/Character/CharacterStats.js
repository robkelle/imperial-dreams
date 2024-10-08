import { Button, Collapse, Divider, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import React, { Fragment, useState } from 'react';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: 'rgb(138, 3, 3)'
		},
		secondary: {
			main: '#E6E8EA'
		}
	}
});

const CharacterStats = (props) => {
	const [
		minimizeCharacteristics,
		setMinimizeCharacteristics
	] = useState(true);
	const [
		minimizeStatistics,
		setMinimizeStatistics
	] = useState(true);

	return (
		<Fragment>
			<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
				<Typography
					variant='h5'
					gutterBottom={true}
					className='texture2'
					style={{
						padding: '10px'
					}}
					align='center'>
					{props.title}
				</Typography>
				<Paper className='texture' align='center' style={{ color: '#e6e8ea' }}>
					<Grid container align='left' style={{ padding: 5 }}>
						<Grid item xs={12}>
							<Typography variant='subtitle1' gutterBottom style={{ color: '#E6E8EA' }}>
								DETAILS
							</Typography>
							<Divider variant='fullWidth' style={{ backgroundColor: 'rgb(138, 3, 3)', marginBottom: 10 }} />
						</Grid>
						{props.attributes.map((value, index) => {
							return (
								<Grid item xl={6} key={index}>
									<Grid container spacing={0}>
										<Grid item xl={2}>
											<img src={value.image} alt='stats' style={{ height: 50, width: 50 }} />
										</Grid>
										<Grid item xs={10} style={{ marginBottom: 10 }}>
											<Typography variant='overline' style={{ marginLeft: 5 }}>
												{value.label}
											</Typography>
											<ThemeProvider theme={theme}>
												<LinearProgress variant='determinate' color='primary' value={value.value} />
												<Typography variant='overline' gutterBottom={true} style={{ color: '#E6E8EA' }}>
													{value.value}
												</Typography>
											</ThemeProvider>
										</Grid>
									</Grid>
								</Grid>
							);
						})}
						<Grid item xs={12}>
							<Button
								style={{ color: '#E6E8EA', backgroundColor: 'rgb(138, 3, 3)', marginTop: 15 }}
								onClick={() => {

										minimizeCharacteristics ? setMinimizeCharacteristics(false) :
										setMinimizeCharacteristics(true);
								}}>
								<Typography variant='subtitle1' gutterBottom style={{ color: '#E6E8EA' }}>
									CHARACTERISTICS
								</Typography>
							</Button>

							<Divider variant='fullWidth' style={{ backgroundColor: 'rgb(138, 3, 3)', marginBottom: 10 }} />
						</Grid>

						<Grid item xs={12}>
							<Collapse in={minimizeCharacteristics}>
								<Table style={{ backgroundColor: 'rgba(0, 0, 0, .3)' }}>
									{props.characteristics.map((value, index) => (
										<TableBody key={index}>
											<TableRow>
												<TableCell style={{ color: '#E6E8EA', border: 'none' }}>{value.type}</TableCell>
												<TableCell style={{ color: '#E6E8EA', border: 'none', width: '50%' }}>{value.label}</TableCell>
											</TableRow>
										</TableBody>
									))}
								</Table>
							</Collapse>
						</Grid>

						<Grid item xs={12}>
							<Button
								style={{ color: '#E6E8EA', backgroundColor: 'rgb(138, 3, 3)' }}
								onClick={() => {

										minimizeStatistics ? setMinimizeStatistics(false) :
										setMinimizeStatistics(true);
								}}>
								<Typography variant='subtitle1' gutterBottom style={{ color: '#E6E8EA' }}>
									STATISTICS
								</Typography>
							</Button>
							<Divider variant='fullWidth' style={{ backgroundColor: 'rgb(138, 3, 3)', marginBottom: 10 }} />
						</Grid>
						<Grid item xs={12}>
							<Collapse in={minimizeStatistics}>
								<Table style={{ backgroundColor: 'rgba(0, 0, 0, .3)' }}>
									{props.stats.map((value, index) => (
										<TableBody key={index}>
											<TableRow>
												<TableCell style={{ color: '#E6E8EA', border: 'none' }}>{value.label}</TableCell>
												<TableCell style={{ color: '#E6E8EA', border: 'none', width: '50%' }}>{value.value}</TableCell>
											</TableRow>
										</TableBody>
									))}
								</Table>
							</Collapse>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Fragment>
	);
};

export { CharacterStats };
