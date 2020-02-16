import { FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup } from '@material-ui/core';

import { Archetype } from './Archetype';
import { ArchetypeSelection } from './ArchetypeSelection';
import { ArchetypeStats } from './ArchetypeStats';
import React from 'react';

class Character extends React.Component {
	constructor() {
		super();
		this.state = {
			eyes: [ 'Green', 'Blue', 'Brown', 'Hazel' ],
			hair: [ 'Brown', 'Blonde' ],
			race: [ 'White', 'Black' ],
			mouth: [ 'Smile', 'Frown', 'Angry' ],
			profession: [ 'Politician' ],
			value: 'eyes',
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

	selectedCharacter = (data) => {
		this.setState({
			selectedCharacter: data
		});
	};

	handleChange = (e) => {
		this.setState({
			value: e.target.value
		});
	};

	handleArchetype = (value) => {
		if (value === 'eyes') {
			return this.state.eyes;
		} else if (value === 'hair') {
			return this.state.hair;
		} else if (value === 'race') {
			return this.state.race;
		} else if (value === 'profession') {
			return this.state.profession;
		} else {
			return this.state.mouth;
		}
	};

	render() {
		return (
			<React.Fragment>
				<Grid container style={{ padding: 20 }}>
					<Grid item xl={12}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} md={1} lg={2} xl={2}>
								<Paper style={{ padding: 10 }}>
									<FormControl onChange={this.handleChange}>
										<RadioGroup value={this.state.value}>
											<FormControlLabel
												label="Eyes"
												control={<Radio color="default" />}
												value="eyes"
											/>
											<FormControlLabel
												label="Hair"
												control={<Radio color="default" />}
												value="hair"
											/>
											<FormControlLabel
												label="Race"
												control={<Radio color="default" />}
												value="race"
											/>
											<FormControlLabel
												label="Mouth"
												control={<Radio color="default" />}
												value="mouth"
											/>
											<FormControlLabel
												label="Profession"
												control={<Radio color="default" />}
												value="profession"
											/>
										</RadioGroup>
									</FormControl>
								</Paper>
							</Grid>

							<Archetype
								title="ARCHETYPE"
								characters={this.handleArchetype(this.state.value)}
								selectedArchetype={this.selectedCharacter}
							/>
							<ArchetypeSelection
								title="ARCHETYPE SELECTION"
								selectedArchetype={this.state.selectedCharacter}
							/>
							<ArchetypeStats title="STATS" stats={this.state.stats} attributes={this.state.attributes} />
						</Grid>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

export { Character };
