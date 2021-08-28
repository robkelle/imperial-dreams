import { Avatar, Card, CardActions, CardContent, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import React, { Component, Fragment } from 'react';

import armor from '../../images/armorInventory.png';
import book from '../../images/bookInventory.png';
import bow from '../../images/bowInventory.png';
import castle from '../../images/castleInventory.png';
import dragon from '../../images/dragonInventory.png';
import food from '../../images/foodInventory.png';
import magic from '../../images/magicInventory.png';
import potion from '../../images/potionInventory.png';
import sword from '../../images/swordInventory.png';

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
				<div className="sidebar">
					<Tabs centered={true} value={tabValue} orientation="vertical" onChange={this.handleChange} style={{ backgroundColor: 'rgba(24, 24, 24, .75)', color: '#E6E8EA', paddingBottom: 10 }} TabIndicatorProps={{ style: { backgroundColor: '#FFDE00' } }}>
						<Tab value={0} label="Swords" icon={<Avatar src={sword} />} />
						<Tab value={1} label="Bows" icon={<Avatar src={bow} />} />
						<Tab value={2} label="Armor" icon={<Avatar src={armor} />} />
						<Tab value={3} label="Intelligence" icon={<Avatar src={book} />} />
						<Tab value={4} label="Food" icon={<Avatar src={food} />} />
						<Tab value={5} label="Land Ownership" icon={<Avatar src={castle} />} />
						<Tab value={6} label="Magic" icon={<Avatar src={magic} />} />
            <Tab value={7} label="Dragons" icon={<Avatar src={dragon} />} />
            <Tab value={8} label="Potions" icon={<Avatar src={potion} />} />
					</Tabs>
				</div>

				<div align="center" style={{ margin: '10px 10px 0px 170px' }}>
					<Grid container spacing={2}>
						{inventory.map((value, index) => {
							if (value.type.index === tabValue) {
								return (
									<Grid item xs={6} sm={3} md={2} lg={2} xl={2} key={index}>
										<div className="animate__animated animate__backInDown">
											<Card className="texture2" style={value.quantity === 0 ? { backgroundColor: '#ffffff !important' } : {}}>
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
