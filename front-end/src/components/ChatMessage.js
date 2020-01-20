import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@material-ui/core';

import Moment from 'moment';
import React from 'react';

const ChatMessage = (props) => {
	return (
		<Grid container spacing={5} justify={props.action}>
			<Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'} xl={'auto'}>
				<Paper style={props.style} elevation={10}>
					<List>
						<ListItem>
							<ListItemAvatar>
								<Avatar>{props.user.substring(0, 1).toUpperCase()}</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={props.message}
								secondary={`${props.user} posted on ${Moment(props.posted).format('llll')}`}
							/>
						</ListItem>
					</List>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default ChatMessage;
