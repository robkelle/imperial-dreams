// This file is used to set all the app.js imports into one export

import { Route, BrowserRouter as Router } from 'react-router-dom';

import BorderBackground from '../images/borderBackground.jpg';
import ButtonBackground from '../images/buttonBackground.jpg';
import { ForgotPassword } from './Authorization/ForgotPassword';
import { Landing } from './Landing';
import { LoadingScreen } from './LoadingScreen';
import Login from './Authorization/Login';
import { Navbar } from './Navbar';
import React from 'react';
import { Register } from './Authorization/Register';
import { ResetPassword } from './Authorization/ResetPassword';
import UserDashboard from './UserDashboard';
import { withCookies } from 'react-cookie';

export {
	React,
	Router,
	Route,
	ForgotPassword,
	Navbar,
	Login,
	Landing,
	Register,
	UserDashboard,
	LoadingScreen,
	withCookies,
	ResetPassword,
	ButtonBackground,
	BorderBackground
};
