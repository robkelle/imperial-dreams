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
			characteristics: [ { label: 'LOADING', type: 'LOADING' } ],
			selectedAttributes: null,
			selected: null,
			formControlStyle: {
				root: {
					fontSize: '2px'
				}
			},
			attributes: [
				{ label: 'STRENGTH', value: 10, image: require('../../images/strength.png') },
				{ label: 'DEXTERITY', value: 20, image: require('../../images/dexterity.png') },
				{ label: 'SPIRIT', value: 26, image: require('../../images/spirit.png') },
				{ label: 'INTELLECT', value: 18, image: require('../../images/intellect.png') },
				{ label: 'ARMOR', value: 60, image: require('../../images/armor.png') },
				{ label: 'MOVEMENT', value: 90, image: require('../../images/movement.png') }
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
					<Paper square className="texture2">
						<Tabs value={this.state.tabValue} indicatorColor="secondary" textColor="inherit" onChange={this.handleTabChange}>
							<Tab label="Character" style={{ color: '#e6e8ea' }} />
							<Tab label="Inventory" style={{ color: '#e6e8ea' }} />
							<Tab label="Barter Market" style={{ color: '#e6e8ea' }} />
						</Tabs>
					</Paper>
				</ThemeProvider>

				{this.state.tabValue === 0 ? (
					<Grid container style={{ padding: 10 }} className="animate__animated animate__slideInLeft">
						<Grid item xl={12} style={{ marginTop: 15 }}>
							<Grid container spacing={2}>
								<Characteristics title="CHARACTERISTICS" types={this.state.types} selectedType={this.selectedAttributes} userCharacteristics={this.state.characteristics} cookies={this.props.cookies} />
								<CharacterProfile title="PROFILE" cookies={this.props.cookies} />
								<CharacterStats title="STATS" characteristics={this.state.characteristics} stats={this.state.stats} attributes={this.state.attributes} cookies={this.props.cookies} />
							</Grid>
						</Grid>
					</Grid>
				) : (
					<Inventory />
				)}
			</React.Fragment>
		);
	}
}

export { Character };
