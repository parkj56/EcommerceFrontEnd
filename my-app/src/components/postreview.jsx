import './postreview.css'
import axios from 'axios';
import React from "react";
import useForm from '../../components/useForm';
import { useHistory } from "react-router-dom";


const PostReview = (props) => {

    const { formValues, handleChange, handleSubmit } = useForm(submitReview)
    const history = useHistory();

    function submitReview(){
        let ratingToInt = parseInt(formValues.rating);
        let review = {
            rating: ratingToInt,
            content: formValues.content,
            productId: props.location.postReviewProps.productId
        };
        postReview(review);
        history.push('/cart')
    }

    const postReview = async (review) => {
        try{
            const jwt = localStorage.getItem('token');
            await axios.post(`https://localhost:44394/api/reviews`, review, { headers: {Authorization: 'Bearer ' + jwt}});
        }
            catch (ex){
            console.log('Error in postReview API call', ex);
        }
    }
    
    return(
        <React.Fragment>
            <div className='body'>
                <div className='card review-card'>
                    <h1 className='review-header'>Leave a Review</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='review-body input-group'>
                            <label className='label' htmlFor="content">Review:</label>
                            <textarea rows='4' cols='25' name="content" value={formValues.content} onChange={handleChange}></textarea>
                        </div>
                        <div className='rating'>
                            <label className='label' htmlFor="rating">Rating:</label>
                            <input type="number" min="1" max="5" name="rating" value={formValues.rating} onChange={handleChange}></input>
                        </div>
                        <br />
                        <button className="btn btn-primary sub-button" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default PostReview;