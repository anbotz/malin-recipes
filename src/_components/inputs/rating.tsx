"use client";
import { ChangeEvent, useState } from "react";

export const Rating = ({}: {}) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((starId) => (
        <input
          key={starId}
          type="radio"
          name="rating"
          value={starId}
          checked={rating === starId}
          onChange={handleRatingChange}
          className="mask mask-star-2 bg-orange-400"
        />
      ))}
    </div>
  );
};
