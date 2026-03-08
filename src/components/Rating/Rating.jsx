import React from "react";
import "./Rating.css";

function Rating({ value, reviewCount, showCount = true, size = "default" }) {
  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <span key={i} className="star star-full">
          ★
        </span>,
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <span key={i} className="star star-half">
          <span className="star-bg">★</span>
          <span className="star-fg">★</span>
        </span>,
      );
    } else {
      stars.push(
        <span key={i} className="star star-empty">
          ★
        </span>,
      );
    }
  }

  return (
    <div className={`rating rating-${size}`}>
      <div className="rating-stars">{stars}</div>
      <span className="rating-value">{value.toFixed(1)}</span>
      {showCount && reviewCount && (
        <span className="rating-count">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}

export default Rating;
