import { Divider, Grid, Paper, Typography } from '@material-ui/core';

import React from 'react';

class Character extends React.Component {
	constructor() {
		super();
		this.state = {
			character: [
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
				'Character',
				'Character',
				'Character',
				'Character',
				'Character'
			]
		};
	}

	render() {
		return (
			<React.Fragment>
				<Typography variant="h4" gutterBottom={true} style={{ color: '#fff' }}>
					ARCHETYPES
				</Typography>
				<Grid container>
					<Grid item xs={8} sm={6} md={5} lg={4} xl={4}>
						<Divider variant="fullWidth" style={{ backgroundColor: '#fff', marginBottom: 10 }} />
						<Paper style={{ backgroundColor: '#181818', color: '#fff' }} align="center">
							<Grid container>
								{this.state.character.map((value, index) => {
									return (
										<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
											<h5>{value + index}</h5>
										</Grid>
									);
								})}
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

export { Character };
