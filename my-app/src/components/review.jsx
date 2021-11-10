import React from 'react'

const Review = (props) => {

    return (
        <li>
            <div>
                {props.review.content}
            </div>
            <div>
                Rating: {props.review.rating}
            </div>
        </li>
    )
}

export default Review;