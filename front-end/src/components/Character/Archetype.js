import { Button, Grid, Paper, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';

const arrayBufferToBase64 = (buffer) => {
	var binary = '';
	var bytes = [].slice.call(new Uint8Array(buffer));
	bytes.forEach((b) => (binary += String.fromCharCode(b)));
	return window.btoa(binary);
};

const Archetype = (props) => {
	return (
		<Fragment>
			<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
				<Typography variant="h5" gutterBottom={true} style={{ color: '#fff' }}>
					{props.title}
				</Typography>
				<Paper style={{ backgroundColor: '#181818', color: '#fff' }} align="center">
					<Grid container>
						{props.selectedType ? (
							props.selectedType.map((value, index) => {
								return (
									<Grid item xs={3} sm={3} md={3} lg={3} xl={3} key={index}>
										<Button
											onClick={() => {
												props.selectedArchetype(value.label);
											}}
										>
											<img
												src={
													'data:image/jpeg;base64,' +
													arrayBufferToBase64(value.image.data.data)
												}
												width="110"
												height="250"
												alt=""
											/>
										</Button>
									</Grid>
								);
							})
						) : (
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								<div align="left" style={{ height: 250, width: '100%', color: '#fff' }} />
							</Grid>
						)}
					</Grid>
				</Paper>
			</Grid>
		</Fragment>
	);
};

export { Archetype };
