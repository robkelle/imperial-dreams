import { Divider, Grid, LinearProgress, Paper, Typography } from '@material-ui/core';

import { Archetype } from './Archetype';
import { ArchetypeSelection } from './ArchetypeSelection';
import { ArchetypeStats } from './ArchetypeStats';
import React from 'react';

class Character extends React.Component {
	constructor() {
		super();
		this.state = {
			characters: [
				'Character',
				'Character',
				'Character',
				'Character',
				'Character',
				'Character',
				'Character',
				'Character',
				'Character',
				'Character',
				'Character',
				'Character'
			],
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

	render() {
		return (
			<React.Fragment>
				<Grid container style={{ padding: 20 }}>
					<Grid item xl={12}>
						<Grid container spacing={2}>
							<Archetype title="ARCHETYPES" characters={this.state.characters} />
							<ArchetypeSelection title="ARCHETYPE SELECTION" />
							<ArchetypeStats
								title="ATTRIBUTES"
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
