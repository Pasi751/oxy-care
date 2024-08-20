import React from 'react';
import './card.css'

const Card = ({ title, description, index }) => {
  const getBackgroundColor = (index) => {
    const colors = ['#AAD9BB', '#D5F0C1']; // Define the two background colors
    return colors[index % colors.length]; // Alternate between the two colors based on the index
  };

  const backgroundColor = getBackgroundColor(index);

  return (
    <div className="card" style={{ backgroundColor }}>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
