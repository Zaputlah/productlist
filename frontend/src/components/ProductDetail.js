// src/components/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Mengambil data produk berdasarkan ID
        fetch(`/data/ProductAll.json`)
            .then((res) => res.json())
            .then((data) => {
                const selectedProduct = data.products.find((p) => p.id === parseInt(id));
                setProduct(selectedProduct);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Product Detail</h1>
            <div>
                <img src={product.thumbnail} alt={product.title} />
            </div>
            <div>
                <h2>{product.title}</h2>
                <p>Category: {product.category}</p>
                <p>Brand: {product.brand}</p>
                <p>Stock: {product.stock}</p>
                <p>Price: ${product.price}</p>
            </div>
        </div>
    );
};

export default ProductDetail;
