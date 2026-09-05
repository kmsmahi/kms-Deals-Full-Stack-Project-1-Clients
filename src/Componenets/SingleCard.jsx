import React from 'react';

const SingleCard = ({singleProduct}) => {
    const{_id,title,price_min, price_max, image, category,status,location,condition,description}=singleProduct || {};
    return (
        <div>
            
        </div>
    );
};

export default SingleCard;