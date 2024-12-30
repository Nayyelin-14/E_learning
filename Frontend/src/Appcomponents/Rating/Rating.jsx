import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";

const Rating = () => {
  // This function will be called when the rating changes
  const ratingChanged = (newRating) => {
    console.log("New rating: ", newRating);
  };
  const [rating, setRating] = useState(4);

  return (
    <div>
      <ReactStars
        count={5} // Total stars
        value={rating}
        onChange={ratingChanged} // Callback function when rating changes
        size={24} // Size of stars
        isHalf={true} // Allow half star rating
        emptyIcon={<i className="far fa-star"></i>} // Empty star icon
        halfIcon={<i className="fa fa-star-half-alt"></i>} // Half star icon
        fullIcon={<i className="fa fa-star"></i>} // Full star icon
        activeColor="#ffd700" // Color for active stars (gold color)
      />
    </div>
  );
};

export default Rating;
