import { Avatar, Card, CardActions, CardContent, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import React, { Component, Fragment } from 'react';

import armor from '../../images/BotW_Armor_Icon.png';
import bow from '../../images/BotW_Bow_Icon.png';
import food from '../../images/BotW_Food_Icon.png';
import materials from '../../images/BotW_Material_Icon.png';
import shield from '../../images/BotW_Shield_Icon.png';
import weapon from '../../images/BotW_Weapon_Icon.png';

const inventory = [
	{
		type: {
			name: 'Weapon',
			index: 0
		},
		name: 'Battle axe',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Weapon',
			index: 0
		},
		name: 'Bludgeon',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Weapon',
			index: 0
		},
		name: 'Club',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Weapon',
			index: 0
		},
		name: 'Flail',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Weapon',
			index: 0
		},
		name: 'Flanged mace',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Weapon',
			index: 0
		},
		name: 'War hammer',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Weapon',
			index: 0
		},
		name: 'Arming Sword',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Weapon',
			index: 0
		},
		name: 'Dagger',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Weapon',
			index: 0
		},
		name: 'Estoc',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Weapon',
			index: 0
		},
		name: 'Falchion',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Weapon',
			index: 0
		},
		name: 'Kanta',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Weapon',
			index: 0
		},
		name: 'Knife',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Weapon',
			index: 0
		},
		name: 'Longsword',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Weapon',
			index: 0
		},
		name: 'Rapier',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Weapon',
			index: 0
		},
		name: 'Saber',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Weapon',
			index: 0
		},
		name: 'Shortsword',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Bow',
			index: 1
		},
		name: 'Daikyu',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Bow',
			index: 1
		},
		name: 'English longbow',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Bow',
			index: 1
		},
		name: 'Welsh longbow',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Bow',
			index: 1
		},
		name: 'Hungarian bow',
		quantity: 0,
		image: ''
	},
	{
		type: {
			name: 'Bow',
			index: 1
		},
		name: 'Mongol bow',
		quantity: 0,
		image: ''
	}
];

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
				<Tabs centered={true} value={tabValue} onChange={this.handleChange} style={{ backgroundColor: 'rgba(24, 24, 24, .75)', paddingBottom: 10 }}>
					<Tab value={0} icon={<Avatar src={weapon} />} />
					<Tab value={1} icon={<Avatar src={bow} />} />
					<Tab value={2} icon={<Avatar src={shield} />} />
					<Tab value={3} icon={<Avatar src={armor} />} />
					<Tab value={4} icon={<Avatar src={materials} />} />
					<Tab value={5} icon={<Avatar src={food} />} />
				</Tabs>

				<div align="center" style={{ margin: 10 }}>
					<Grid container spacing={2}>
						{inventory.map((value, index) => {
							if (value.type.index === tabValue) {
								return (
									<Grid item xs={6} sm={3} md={2} lg={2} xl={2} key={index}>
										<div className="animate__animated animate__backInDown">
											<Card className= style={value.quantity === 0 ? {backgroundColor: '#ffffff !important'} : {}}>
												<CardContent>
													<Typography variant="overline">{value.name}</Typography>
												</CardContent>
												<CardActions>
													<Typography variant="subtitle2">x {value.quantity}</Typography>
												</CardActions>
											</Card>
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
