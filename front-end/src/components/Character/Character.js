import { Grid, Paper, Tab, Tabs } from '@material-ui/core';

import { CharacterProfile } from './CharacterProfile';
import { CharacterStats } from './CharacterStats';
import { Characteristics } from './Characteristics';
import { Inventory } from '../Inventory/Inventory';
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import config from '../../config.json';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: 'rgb(138, 3, 3)'
		},
		secondary: {
			main: '#fff'
		}
	}
});

class Character extends React.Component {
	constructor() {
		super();
		this.state = {
			types: [],
			tabValue: 0,
			characteristics: [
				{ label: 'LOADING', type: 'LOADING' }
			],
			selectedAttributes: null,
			selected: null,
			formControlStyle: {
				root: {
					fontSize: '2px'
				}
			},
			attributes: [
				{ label: 'STRENGTH', value: 10, image: require('../../images/shieldInventory.png') },
				{ label: 'POWER', value: 20, image: require('../../images/dragonInventory.png') },
				{ label: 'SPIRIT', value: 26, image: require('../../images/ballInventory.png') },
				{ label: 'INTELLECT', value: 18, image: require('../../images/bookInventory.png') },
				{ label: 'ARMOR', value: 60, image: require('../../images/armorInventory.png') },
				{ label: 'STAMINA', value: 90, image: require('../../images/foodInventory.png') },
				{ label: 'WEALTH', value: 90, image: require('../../images/castleInventory.png') }
			],
			stats: [
				{ label: 'Rare Items', value: '0' },
				{ label: 'Total Kills', value: '0' },
				{ label: 'Debt', value: '0 coin' },
				{ label: 'Earned', value: '0 coin' },
				{ label: 'Spent', value: '0 coin' }
			]
		};
	}

	componentDidMount() {
		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/archetype/groupByType`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				if (res.httpStatus === 401) {
					this.props.cookies.remove('isAuthorized', { path: '/' });
				} else {
					this.setState({
						types: res
					});
				}
			});

		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/characterArchetype/${this.props.cookies.cookies._id}`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				if (res.httpStatus === 401) {
					this.props.cookies.remove('isAuthorized', { path: '/' });
				} else {
					this.setState({
						characteristics: res
					});
				}
			});
	}

	selectedAttributes = (userID) => {
		fetch(`${config.API.DOMAIN}:${config.API.PORT}/api/characterArchetype/${userID}`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				if (res.httpStatus === 401) {
					this.props.cookies.remove('isAuthorized', { path: '/' });
				} else {
					this.setState({
						characteristics: res
					});
				}
			});
	};

	handleTabChange = (e, newValue) => {
		this.setState({
			tabValue: newValue
		});
	};

	render() {
		return (
			<React.Fragment>
				<ThemeProvider theme={theme}>
					<Paper square className='texture2'>
						<Tabs value={this.state.tabValue} TabIndicatorProps={{ style: { backgroundColor: '#e6e8ea' } }} textColor='inherit' onChange={this.handleTabChange}>
							<Tab label='Character' style={{ color: '#e6e8ea' }} />
							<Tab label='Inventory' style={{ color: '#e6e8ea' }} />
							<Tab label='Barter Market' style={{ color: '#e6e8ea' }} />
						</Tabs>
					</Paper>
				</ThemeProvider>

				{
					this.state.tabValue === 0 ? <Grid container style={{ padding: 10 }} className='animate__animated animate__slideInLeft'>
						<Grid item xl={12} style={{ marginTop: 15 }}>
							<Grid container spacing={2}>
								<Characteristics title='CHARACTERISTICS' types={this.state.types} selectedType={this.selectedAttributes} userCharacteristics={this.state.characteristics} cookies={this.props.cookies} />
								<CharacterProfile title='PROFILE' cookies={this.props.cookies} />
								<CharacterStats title='CHARACTER' characteristics={this.state.characteristics} stats={this.state.stats} attributes={this.state.attributes} cookies={this.props.cookies} />
							</Grid>
						</Grid>
					</Grid> :
					<Inventory />}
			</React.Fragment>
		);
	}
}

export { Character };
