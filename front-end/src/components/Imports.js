// This file is used to set all the app.js imports into one export

import { Route, BrowserRouter as Router } from 'react-router-dom';

import AddArchetype from './Character/AddArchetype';
import ForgotPassword from './Authentication/ForgotPassword';
import { Landing } from './Landing';
import { LoadingScreen } from './LoadingScreen';
import Login from './Authentication/Login';
import Map from './GameEngine/Map';
import { Navbar } from './Navbar';
import {Profile} from './Profile';
import React from 'react';
import Register from './Authentication/Register';
import ResetPassword from './Authentication/ResetPassword';
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
	Map,
	LoadingScreen,
	withCookies,
	ResetPassword,
  AddArchetype,
  Profile
};
