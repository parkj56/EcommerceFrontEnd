import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import './shoppingcart.css'


const ShoppingCart = (props) => {

    const [total, setCartTotal] = useState(0);

    useEffect(() => {
        props.getProductsInCart();
        getCartTotal(props.user.id);
    }, [props.productsInCart])

    async function getCartTotal (userId) {
        try{
          const jwt = localStorage.getItem('token');
          let response = await axios.get(`https://localhost:44394/api/shoppingcart/total/${userId}`, { headers: {Authorization: 'Bearer ' + jwt}});
          setCartTotal(response.data)
        }
        catch (ex){
            console.log('Error in getCartTotal API call', ex);
        }
    }

    return (
        <React.Fragment>
            <div classname='container-md con-body'>
                <div className='row'>
                    <div className='col-md-3 transparent-column' />
                        <div className='col-md-6 shopping-cart-body'>
                            {props.productsInCart.map(product => {
                                return (
                                    <div className='card product'>
                                        <div className='row'>
                                            <div className='col-md-9'>
                                                <h2>
                                                    {product.product.name}
                                                </h2>
                                                <div>
                                                    {product.product.description}
                                                </div>
                                                <div>
                                                    Price: ${product.product.price}
                                                </div>
                                                <div>
                                                    Category: {product.product.category}
                                                </div>
                                                <div>
                                                    Quantity: {product.quantity}
                                                </div>
                                                <Link to ={{
                                                    pathname:'/postreview',
                                                    postReviewProps:{
                                                        productId: product.product.id
                                                    }
                                                }} >Leave Review</Link>
                                            </div>
                                            <div className='col-md-3 right-side-card'>
                                                <div classname='upper-padding'></div>
                                                <div className='submit-div'>
                                                    <button className='btn btn-primary submit-button' onClick={event => props.deleteProductInCart(product.product.id)}>Remove from Cart</button>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                )
                            })}
                            <div className='card product'>
                                <h3 className='total'>Total:</h3>
                                <h4>{total}</h4>
                            </div>
                        </div>
                    <div className='col-md-3 transparent-column' />
                </div>
            </div>
        </React.Fragment>
    )
}

export default ShoppingCart;

