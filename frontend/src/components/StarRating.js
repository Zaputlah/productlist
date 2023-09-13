import React from 'react';

const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            // Tambahkan bintang yang diberi warna jika rating lebih besar dari indeks
            stars.push(<span key={i} className="star-filled">&#9733;</span>);
        } else {
            // Tambahkan bintang yang tidak berwarna jika rating lebih kecil dari indeks
            stars.push(<span key={i} className="star">&#9733;</span>);
        }
    }

    return <div className="star-rating">{stars}</div>;
};

export default StarRating;
