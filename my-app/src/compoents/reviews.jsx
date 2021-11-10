import React from 'react';
import Review from './review';

const Reviews = (props) => {

    return (
        <React.Fragment>
        {props.reviews.map(review => {
            return (
                <ul>
                    <Review review={review}/>
                </ul>
            )
        })}
        </React.Fragment>
    )
}

export default Reviews;