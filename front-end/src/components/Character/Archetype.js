import { Button, Grid, Paper, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';

const Archetype = (props) => {
	return (
		<Fragment>
			<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
				<Typography variant="h5" gutterBottom={true} style={{ color: '#fff' }}>
					{props.title}
				</Typography>
				<Paper style={{ backgroundColor: '#181818', color: '#fff' }} align="center">
					<Grid container>
						{props.characters.map((value, index) => {
							return (
								<Grid item xs={3} sm={3} md={3} lg={3} xl={3} key={index}>
									<Button
										onClick={() => {
											props.selectedArchetype(value);
										}}
									>
										<img src="https://place-hold.it/110x250/666" alt="" />
									</Button>
								</Grid>
							);
						})}
					</Grid>
				</Paper>
			</Grid>
		</Fragment>
	);
};

export { Archetype };
