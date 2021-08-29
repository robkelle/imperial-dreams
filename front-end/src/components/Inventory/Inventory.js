import { Avatar, Button, Card, CardActions, CardContent, Divider, Grid, LinearProgress, Tab, Tabs, Typography } from '@material-ui/core';
import React, { Component, Fragment } from 'react';

import { ThemeProvider } from '@material-ui/styles';
import armor from '../../images/armorInventory.png';
import book from '../../images/bookInventory.png';
import bow from '../../images/bowInventory.png';
import castle from '../../images/castleInventory.png';
import { createMuiTheme } from '@material-ui/core/styles';
import dragon from '../../images/dragonInventory.png';
import food from '../../images/foodInventory.png';
import inventory from './inventorySampleData.json';
import magic from '../../images/magicInventory.png';
import potion from '../../images/potionInventory.png';
import sword from '../../images/swordInventory.png';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#e6e8ea'
		},
		secondary: {
			main: 'rgb(138, 3, 3)'
		}
	}
});

export class Inventory extends Component {
	constructor() {
		super();
		this.state = {
			tabValue: 0
		};

		this.handleChange = (e, newValue) => {
			this.setState({ tabValue: newValue });
		};
	}

	render() {
		const { tabValue } = this.state;
		return (
			<Fragment>
				<div className='sidebar'>
					<Tabs centered={true} value={tabValue} orientation='vertical' onChange={this.handleChange} style={{ backgroundColor: 'rgba(24, 24, 24, .75)', color: '#E6E8EA', paddingBottom: 10 }} TabIndicatorProps={{ style: { backgroundColor: '#FFDE00' } }}>
						<Tab value={0} label='Swords' icon={<Avatar src={sword} />} />
						<Tab value={1} label='Bows' icon={<Avatar src={bow} />} />
						<Tab value={2} label='Armor' icon={<Avatar src={armor} />} />
						<Tab value={3} label='Intelligence' icon={<Avatar src={book} />} />
						<Tab value={4} label='Food' icon={<Avatar src={food} />} />
						<Tab value={5} label='Land Ownership' icon={<Avatar src={castle} />} />
						<Tab value={6} label='Magic' icon={<Avatar src={magic} />} />
						<Tab value={7} label='Dragons' icon={<Avatar src={dragon} />} />
						<Tab value={8} label='Potions' icon={<Avatar src={potion} />} />
					</Tabs>
				</div>

				<div align='center' style={{ margin: '10px 10px 0px 170px' }}>
					<Grid container spacing={2}>
						{inventory.map((value, index) => {
							if (value.type.index === tabValue) {
								return (
									<Grid item xs={12} sm={6} md={4} lg={4} xl={2} key={index}>
										<div className='animate__animated animate__backInDown'>
											<ThemeProvider theme={theme}>
												<Card
													className='texture2'
													style={

															value.quantity === 0 ? { backgroundColor: '#E6E8EA !important' } :
															{}
													}>
													<CardContent>
														<Typography variant='h5' gutterBottom={true}>{value.name}</Typography>
														<Grid container spacing={1} align='left'>
															<Grid item xs={6}>
																<Typography variant='overline' gutterBottom={true}>
																	Level: {value.itemDetails.level}
																</Typography>
																<LinearProgress variant='determinate' color='secondary' value={value.itemDetails.level} />
															</Grid>
															<Grid item xs={6}>
																<Typography variant='overline'>Strength: {value.itemDetails.strength}</Typography>
																<LinearProgress variant='determinate' color='secondary' value={value.itemDetails.strength} />
															</Grid>
														</Grid>
														<Grid container spacing={1} align='left'>
															<Grid item xs={6}>
																<Typography variant='overline'>Power: {value.itemDetails.power}</Typography>
																<LinearProgress variant='determinate' color='secondary' value={value.itemDetails.power} />
															</Grid>
															<Grid item xs={6}>
																<Typography variant='overline'>Spirit: {value.itemDetails.spirit}</Typography>
																<LinearProgress variant='determinate' color='secondary' value={value.itemDetails.spirit} />
															</Grid>
														</Grid>
														<Grid container spacing={1} align='left'>
															<Grid item xs={6}>
																<Typography variant='overline'>Intellect: {value.itemDetails.intellect}</Typography>
																<LinearProgress variant='determinate' color='secondary' value={value.itemDetails.intellect} />
															</Grid>

															<Grid item xs={6}>
																<Typography variant='overline'>Armor: {value.itemDetails.armor}</Typography>
																<LinearProgress variant='determinate' color='secondary' value={value.itemDetails.armor} />
															</Grid>
														</Grid>
														<Grid container spacing={1} align='left'>
															<Grid item xs={6}>
																<Typography variant='overline'>Stamina: {value.itemDetails.stamina}</Typography>
																<LinearProgress variant='determinate' color='secondary' value={value.itemDetails.stamina} />
															</Grid>
															<Grid item xs={6}>
																<Typography variant='overline'>Coin: {value.itemDetails.coin}</Typography>
																<LinearProgress variant='determinate' color='secondary' value={value.itemDetails.coin} />
															</Grid>
														</Grid>
													</CardContent>
													<CardActions style={{backgroundColor: 'rgba(24, 24, 24, .75)'}}>
														<Divider orientation='horizontal' variant='fullWidth' light={true} />
														<Grid container align='right'>
															<Grid item xs={4}>
																<Typography variant='overline'>
																	Quantity: {value.quantity}
																</Typography>
															</Grid>
															<Grid item xs={8}>
																<Button variant='contained' color='primary'>
																	Equip
																</Button>

																<Button variant='contained' color='secondary' style={{marginLeft: 10}}>
																	Sell
																</Button>
															</Grid>
														</Grid>
													</CardActions>
												</Card>
											</ThemeProvider>
										</div>
									</Grid>
								);
							} else {
								return <div key={index} />;
							}
						})}
					</Grid>
				</div>
			</Fragment>
		);
	}
}

export default Inventory;
