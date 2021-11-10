import './App.css';
import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Products from './components/product';
import ShoppingCart from './components/shoppingcart';
import Login from './components/login';
import Register from './components/register';
import Seller from './components/seller';
import PostReview from './components/postreview';
import Logout from './components/logout';
import Navbar from './components/navbar';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      searchTerm: '',
      searchResults: [],
      productsInCart: [],
    };
  }

  componentDidMount() {
    const jwt = localStorage.getItem('token');
    try{
      const user = jwtDecode(jwt);
      this.setState({user});
    } catch (ex){
      console.log('Error in setting user', ex)
    }
  }



  getProducts = async () => {
    try{
      let response = await axios.get(`https://localhost:44394/api/products`);
      this.setState({
        searchResults: response.data
      })
    }
    catch (ex){
        console.log('Error in getProducts API call', ex);
    }
  }
  
  setSearchName = async (searchTerm) => {
    try{
        let response = await axios.get(`https://localhost:44394/api/search/name/${searchTerm}`);
        this.setState({
          searchResults: response.data
        })
    }
    catch (ex){
        console.log('Error in setSearchName API call', ex);
    }
  }

  setSearchCategory = async (searchTerm) => {
    try{
        let response = await axios.get(`https://localhost:44394/api/search/category/${searchTerm}`);
        this.setState({
          searchResults: response.data
        })
    }
    catch (ex){
        console.log('Error in setSearchCategory API call', ex);
    }
  }

  getProductsInCart = async () => {
    try{
      const jwt = localStorage.getItem('token');
      let response = await axios.get(`https://localhost:44394/api/shoppingcart/${this.state.user.id}`, { headers: {Authorization: 'Bearer ' + jwt}});
      this.setState({
        productsInCart: response.data
      })
    }
    catch (ex){
        console.log('Error in getProductsInCart API call', ex);
    }
  }

  deleteProductInCart = async (productId) => {
    try{
      const jwt = localStorage.getItem('token');
      await axios.delete(`https://localhost:44394/api/shoppingcart/product/${productId}/user/${this.state.user.id}`, { headers: {Authorization: 'Bearer ' + jwt}});
      this.getProductsInCart();
    }
    catch (ex){
        console.log('Error in deleteProductInCart API call', ex);
    }
  }

  render(){
    return (
      <Router>
        <Navbar user={this.state.user}/>
        
        <Switch>

          <Route exact path ="/" render={props => <Products {...props} user={this.state.user} addToCart={this.addToCart} getProducts={this.getProducts} searchTerm={this.state.searchTerm} setSearchName={this.setSearchName} setSearchCategory={this.setSearchCategory} searchResults={this.state.searchResults}/>}/>
          

          <Route path="/cart" render={props => <ShoppingCart {...props} user={this.state.user} getProductsInCart={this.getProductsInCart} deleteProductInCart={this.deleteProductInCart} productsInCart={this.state.productsInCart}/> } />
          

          <Route path="/login" component={Login} />


          <Route path="/register" component={Register} />

          
          <Route path="/seller" component={Seller} />
          

          <Route path="/postreview" component={PostReview} />


          <Route path="/logout" component={Logout} />

        </Switch>

      </Router>
    )
  }
}


export default App;


