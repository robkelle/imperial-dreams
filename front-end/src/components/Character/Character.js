import { FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core';

import { Archetype } from './Archetype';
import { ArchetypeSelection } from './ArchetypeSelection';
import { ArchetypeStats } from './ArchetypeStats';
import React from 'react';
import config from '../../config.json';

class Character extends React.Component {
	constructor() {
		super();
		this.state = {
			types: [],
			value: null,
			selectedAttributes: null,
			selected: null,
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

	componentDidMount() {
		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/archetype/groupByType`, {
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
					types: res
				});
			});
	}

	selectedAttributes = (data) => {
		this.setState({
			selectedAttributes: data
		});
	};

	handleChange = (e) => {
		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/archetype/${e.target.value}`, {
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
			value: e.target.value
		});
	};

	render() {
		return (
			<React.Fragment>
				<Grid container style={{ padding: 20 }}>
					<Grid item xl={12}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} md={1} lg={2} xl={2}>
								<FormControl onChange={this.handleChange}>
									<RadioGroup value={this.state.value || ''}>
										{this.state.types.map((value, index) => {
											return (
												<FormControlLabel
													key={index}
													label={value._id.type}
													control={
														<Radio color="default" style={{ color: 'rgb(138, 3, 3)' }} />
													}
													value={value._id.type}
													style={{ color: '#fff' }}
												/>
											);
										})}
									</RadioGroup>
								</FormControl>
							</Grid>

							<Archetype
								title="ARCHETYPE"
								selectedType={this.state.selected}
								selectedArchetype={this.selectedAttributes}
							/>
							<ArchetypeSelection title="CHARACTER" selectedArchetype={this.state.selectedAttributes} />
							<ArchetypeStats
								title="STATS"
								selectedType={this.state.types}
								selectedArchetype={this.state.selectedAttributes}
								stats={this.state.stats}
								attributes={this.state.attributes}
							/>
						</Grid>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

export { Character };
