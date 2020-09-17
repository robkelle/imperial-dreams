import { FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, Tab, Tabs } from '@material-ui/core';

import { CharacterProfile } from './CharacterProfile';
import { CharacterStats } from './CharacterStats';
import { Characteristics } from './Characteristics';
import { Inventory } from '../Inventory/Inventory';
import React from 'react';
import config from '../../config.json';

class Character extends React.Component {
	constructor() {
		super();
		this.state = {
			types: [],
			defaultRadioValue: 'Eye Color',
			tabValue: 0,
			characteristics: [ { label: 'LOADING', type: 'LOADING' } ],
			selectedAttributes: null,
			selected: null,
			formControlStyle: {
				root: {
					fontSize: '2px'
				}
			},
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

	async componentDidMount() {
		await fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/archetype/groupByType`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(async (res) => {
			this.setState({
				types: await res.json()
			});
		});

		await fetch(
			`${config.API.DOMAIN}:${config.API.PORT}/api/characterArchetype/${this.props.cookies.cookies._id}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		).then(async (res) => {
			this.setState({
				characteristics: await res.json()
			});
		});

		this.handleChange(null, this.state.defaultRadioValue);
	}

	selectedAttributes = async (userID) => {
		await fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/characterArchetype/${userID}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(async (res) => {
			this.setState({
				characteristics: await res.json()
			});
		});
	};

	handleChange = (e, data) => {
		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/archetype/${data || e.target.value}`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				this.setState({
					selected: res
				});
			});

		this.setState({
			defaultRadioValue: data || e.target.value
		});
	};

	handleTabChange = (e, newValue) => {
		this.setState({
			tabValue: newValue
		});
	};

	render() {
		return (
			<React.Fragment>
				<Paper square style={{ backgroundColor: 'rgb(138, 3, 3)' }}>
					<Tabs
						value={this.state.tabValue}
						indicatorColor="secondary"
						textColor="inherit"
						onChange={this.handleTabChange}
					>
						<Tab label="Character" style={{ color: '#fff' }} />
						<Tab label="Inventory" style={{ color: '#fff' }} />
					</Tabs>
				</Paper>

				{this.state.tabValue === 0 ? (
					<Grid container style={{ padding: 20 }} className="animate__animated animate__slideInLeft">
						<Grid item xl={12}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
									<FormControl onChange={this.handleChange}>
										<RadioGroup value={this.state.defaultRadioValue}>
											{this.state.types.map((value, index) => {
												return (
													<FormControlLabel
														key={index}
														label={value._id.type}
														control={
															<Radio
																color="default"
																style={{ color: 'rgb(138, 3, 3)' }}
															/>
														}
														value={value._id.type}
														style={{ color: '#fff' }}
													/>
												);
											})}
										</RadioGroup>
									</FormControl>
								</Grid>

								<Characteristics
									title="CUSTOMIZE"
									types={this.state.selected}
									selectedType={this.selectedAttributes}
									characteristics={this.state.characteristics}
								/>
								<CharacterProfile title="PROFILE" cookies={this.props.cookies} />
								<CharacterStats
									title="STATS"
									characteristics={this.state.characteristics}
									stats={this.state.stats}
									attributes={this.state.attributes}
								/>
							</Grid>
						</Grid>
					</Grid>
				) : (
					<Inventory />
				)}
			</React.Fragment>
		);
	}
}

export { Character };
