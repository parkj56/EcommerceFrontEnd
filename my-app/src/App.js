import './App.css';
import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Products from './components/products';
import ShoppingCart from './components/shoppingcart';
import Login from './components/login';
import Register from './components/register';
import Seller from './components/Seller';
import PostReview from './components/postreview';
import Logout from './components/pages/logout';
import Navbar from './components/navbar';

export default App;
