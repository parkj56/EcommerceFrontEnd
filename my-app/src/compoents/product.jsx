import React, { useEffect, useState } from 'react';
import Reviews from './reviews';
import axios from 'axios';
import './products.css'



import { useHistory } from "react-router-dom";

const Product = (props) => {

    const[reviews, setReviews] = useState([])
    const[averageRating, setAverageRating] = useState([])
    const history = useHistory();

    const getReviews = async () => {
        try{
            let response = await axios.get(`https://localhost:44394/api/reviews/${props.product.id}`);
            setReviews(response.data);
        }
        catch (ex){
            console.log('Error in getReviews API call', ex);
        }
    }

    const getAverageRating = async () => {
        try{
            let response = await axios.get(`https://localhost:44394/api/reviews/average/${props.product.id}`);
            setAverageRating(response.data);
        }
        catch (ex){
            console.log('Error in getAverageRating API call', ex);
        }
    }

    const addToCart = (productId, quantity) => {
        let userId = props.user.id
        let shoppingCartItem = {
            userId: userId,
            productId: productId,
            quantity: quantity
        }
        postToCart(shoppingCartItem);
    }
    
    const postToCart = async (shoppingCartItem) => {
        try{
            const jwt = localStorage.getItem('token');
            await axios.post(`https://localhost:44394/api/shoppingcart`, shoppingCartItem, { headers: {Authorization: 'Bearer ' + jwt}});
            history.push('/cart')
        }
        catch (ex){
            console.log('Error in postToCart API call', ex);
        }
    }

    useEffect(() => {
        getReviews(props.product.id);
    }, [props.product])

    useEffect(() => {
        getAverageRating(props.product.id);
    }, [props.product])


    return ( 
        <div className="card product-card">
            <div className='row'>
                <div className='col-6'>
                    <h2>{props.product.name}</h2>
                    <p>{props.product.description}</p>
                    <p>Price: ${props.product.price}</p>
                    <p>Category: {props.product.category}</p>
                    <p>Average Rating: {averageRating}</p>
                    {props.user &&
                        <button className="btn btn-primary" onClick={event => addToCart(props.product.id, 1)}>Add to Cart</button>
                    }
                </div>
                <div className='col-6'>
                    <h4>Reviews</h4>
                    <Reviews reviews={reviews} />
                </div>
            </div>
        </div>      
    )
}

export default Product;