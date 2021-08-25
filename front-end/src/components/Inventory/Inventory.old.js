import { Avatar, Card, CardActions, CardContent, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import React, { Component, Fragment } from 'react';

import armor from '../../images/BotW_Armor_Icon.png';
import bow from '../../images/BotW_Bow_Icon.png';
import food from '../../images/BotW_Food_Icon.png';
import materials from '../../images/BotW_Material_Icon.png';
//import rare from '../../images/BotW_Key_Item_Icon.png';
import shield from '../../images/BotW_Shield_Icon.png';
import weapon from '../../images/BotW_Weapon_Icon.png';

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
	},
	{
		type: 'Material',
		name: 'Diamond',
		quantity: 1,
		image: 'ALttP_Bow_&_Arrows_Sprite.png'
	}
];

export class Inventory extends Component {
	render() {
		return (
			<Fragment>
				<div className="animate__animated animate__backInDown">
					<Tabs indicatorColor="primary" textColor="inherit" centered={true}>
						<Tab icon={<Avatar src={weapon} />} />
						<Tab icon={<Avatar src={bow} />} />
						<Tab icon={<Avatar src={shield} />} />
						<Tab icon={<Avatar src={armor} />} />
						<Tab icon={<Avatar src={materials} />} />
						<Tab icon={<Avatar src={food} />} />
					</Tabs>

					<Grid container spacing={0} justify="center">
						{inventory.map((value, index) => {
							return (
								<Grid lg={1} item style={{ margin: 5 }} key={index}>
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
				</div>
			</Fragment>
		);
	}
}

export default Inventory;
