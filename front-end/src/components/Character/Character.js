import { FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core';

import { Archetype } from './Archetype';
import { ArchetypeSelection } from './ArchetypeSelection';
import { ArchetypeStats } from './ArchetypeStats';
import React from 'react';

class Character extends React.Component {
	constructor() {
		super();
		this.state = {
			eyes: [ 'Green', 'Blue', 'Brown', 'Hazel', 'Gray', 'Amber', 'Yellow', 'Purple', 'Red' ],
			hair: [ 'Brown', 'Blonde' ],
			skin: [
				'Porcelain',
				'Ivory',
				'Warm Ivory',
				'Sand',
				'Beige',
				'Warm Beige',
				'Natural',
				'Honey',
				'Golden',
				'Almond',
				'Chestnut',
				'Espresso'
			],
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

	selectedAttributes = (data) => {
		this.setState({
			selectedAttributes: data,
			[`${this.state.value}Data`]: {
				[this.state.value]: data
			}
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
		} else if (value === 'skin') {
			return this.state.skin;
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
								<FormControl onChange={this.handleChange}>
									<RadioGroup value={this.state.value}>
										<FormControlLabel
											label="Eyes"
											control={<Radio color="default" style={{ color: 'rgb(138, 3, 3)' }} />}
											value="eyes"
											style={{ color: '#fff' }}
										/>
										<FormControlLabel
											label="Hair"
											control={<Radio color="default" style={{ color: 'rgb(138, 3, 3)' }} />}
											value="hair"
											style={{ color: '#fff' }}
										/>
										<FormControlLabel
											label="Skin"
											control={<Radio color="default" style={{ color: 'rgb(138, 3, 3)' }} />}
											value="skin"
											style={{ color: '#fff' }}
										/>
										<FormControlLabel
											label="Mouth"
											control={<Radio color="default" style={{ color: 'rgb(138, 3, 3)' }} />}
											value="mouth"
											style={{ color: '#fff' }}
										/>
										<FormControlLabel
											label="Profession"
											control={<Radio color="default" style={{ color: 'rgb(138, 3, 3)' }} />}
											value="profession"
											style={{ color: '#fff' }}
										/>
									</RadioGroup>
								</FormControl>
							</Grid>

							<Archetype
								title="ARCHETYPE"
								characters={this.handleArchetype(this.state.value)}
								selectedArchetype={this.selectedAttributes}
							/>
							<ArchetypeSelection title="CHARACTER" selectedArchetype={this.state.selectedAttributes} />
							<ArchetypeStats
								title="STATS"
								stats={this.state.stats}
								attributes={this.state.attributes}
								eyes={this.state.eyesData}
								hair={this.state.hairData}
								skin={this.state.skinData}
								mouth={this.state.mouthData}
								profession={this.state.professionData}
							/>
						</Grid>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

export { Character };
