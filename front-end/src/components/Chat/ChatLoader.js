import { Grid, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@material-ui/core';

import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const ChatLoader = () => {
	return (
		<div className="loader" key={0} style={{ height: '100px' }}>
			<Grid container spacing={5}>
				<Grid item xs={12}>
					<Paper elevation={10}>
						<List>
							<ListItem>
								<ListItemAvatar>
									<Skeleton variant="circle" width={40} height={40} />
								</ListItemAvatar>
								<ListItemText
									primary={<Skeleton variant="rect" width={'100%'} height={50} />}
									secondary={<Skeleton variant="text" width={'25%'} />}
								/>
							</ListItem>
						</List>
					</Paper>
				</Grid>
			</Grid>

			<Grid container spacing={5}>
				<Grid item xs={4}>
					<Paper elevation={10}>
						<List>
							<ListItem>
								<ListItemAvatar>
									<Skeleton variant="circle" width={40} height={40} />
								</ListItemAvatar>
								<ListItemText
									primary={<Skeleton variant="rect" width={'100%'} height={50} />}
									secondary={<Skeleton variant="text" width={'25%'} />}
								/>
							</ListItem>
						</List>
					</Paper>
				</Grid>
			</Grid>

			<Grid container spacing={5}>
				<Grid item xs={6}>
					<Paper elevation={10}>
						<List>
							<ListItem>
								<ListItemAvatar>
									<Skeleton variant="circle" width={40} height={40} />
								</ListItemAvatar>
								<ListItemText
									primary={<Skeleton variant="rect" width={'100%'} height={50} />}
									secondary={<Skeleton variant="text" width={'25%'} />}
								/>
							</ListItem>
						</List>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default ChatLoader;
