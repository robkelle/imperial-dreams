import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@material-ui/core';

import Moment from 'moment';
import React from 'react';

const ChatGIFMessage = (props) => {
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
								primary={<img src={props.message} alt="" />}
								secondary={
									<span align="left">
										<Typography variant="caption" style={{ color: '#fff' }}>
											{props.user} posted on {Moment(props.posted).format('llll')}
										</Typography>
									</span>
								}
							/>
						</ListItem>
					</List>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default ChatGIFMessage;
