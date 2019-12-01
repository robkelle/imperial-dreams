// This file is used to set all the app.js imports into one export

import { Route, BrowserRouter as Router } from 'react-router-dom';

import BorderBackground from '../images/borderBackground.jpg';
import ButtonBackground from '../images/buttonBackground.jpg';
import { ForgotPassword } from './Authorization/forgotPassword';
import { Landing } from './landing';
import { LoadingScreen } from './loadingScreen';
import Login from './Authorization/login';
import { Navbar } from './navbar';
import React from 'react';
import { Register } from './Authorization/register';
import { ResetPassword } from './Authorization/resetPassword';
import { UserDashboard } from './userDashboard';
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
