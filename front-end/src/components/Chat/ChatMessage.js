import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@material-ui/core';

import Moment from 'moment';
import React from 'react';

const ChatMessage = (props) => {
	if (props.type === 'disconnect' || props.type === 'connect') {
		return (
			<Grid container style={{ margin: '12px 0px 12px 0px' }} justify='flex-start'>
				<Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'} xl={'auto'}>
					<Typography variant="caption" style={{ color: '#fff' }}>
						{props.message}
					</Typography>
				</Grid>
			</Grid>
		);
	} else {
		return (
			<Grid container style={{ margin: '12px 0px 12px 0px' }} justify={props.action}>
				<Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'} xl={'auto'}>
					<Paper style={props.style} elevation={10}>
						<List>
							<ListItem>
								<ListItemAvatar>
									<Avatar>{props.user.substring(0, 1).toUpperCase()}</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={props.message}
									secondary={
										<Typography variant="caption" display="block">
											{props.user} posted on {Moment(props.posted).format('llll')}
										</Typography>
									}
								/>
							</ListItem>
						</List>
					</Paper>
				</Grid>
			</Grid>
		);
	}
};

export default ChatMessage;
