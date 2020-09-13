import { Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import React, { Component } from 'react';

const inventory = [
	{
		type: 'Material',
		name: 'Mushroom',
		quantity: 5,
		image: ''
	},
	{
		type: 'Material',
		name: 'Apple',
		quantity: 1,
		image: ''
	},
	{
		type: 'Material',
		name: 'Gold',
		quantity: 2,
		image: ''
	},
	{
		type: 'Material',
		name: 'Wood',
		quantity: 25,
		image: ''
	},
	{
		type: 'Material',
		name: 'Steel',
		quantity: 27,
		image: ''
	}
];

export class Inventory extends Component {
	render() {
		return (
			<Grid container spacing={0} className="animated slideInRight faster">
				{inventory.map((value) => {
					return (
						<Grid lg={1} item style={{ margin: 5 }}>
							<Card style={{ backgroundColor: 'rgba(24,24,24, .75)', color: '#fff' }}>
								<CardContent>
									<Typography variant="overline">{value.name}</Typography>
								</CardContent>
								<CardActions>
									<Typography variant="subtitle2">x {value.quantity}</Typography>
								</CardActions>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		);
	}
}

export default Inventory;
