import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import '../App.css';
import StarRating from './StarRating';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showProductTableButton, setShowProductTableButton] = useState(false);
    const [showProductTableList, setShowProductTableList] = useState(false);
    const [showProductTableview, setShowProductTableview] = useState(false); // Tambahkan variabel ini
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        // Mengambil data produk dari sumber data Anda (misalnya, JSON file)
        // Ganti URL 'https://dummyjson.com/products' dengan URL yang sesuai dengan sumber data Anda.
        fetch('https://dummyjson.com/products')
            .then((response) => response.json())
            .then((data) => setProducts(data.products));
    }, []);

    const handleShowProductTable = () => {
        setShowProductTableButton(!showProductTableButton);
        setShowProductTableList(!showProductTableList);
    };

    const handleCloseProductTable = () => {
        setShowProductTableList(false);
        setShowProductTableview(false); // Menutup modal saat tabel ditutup
        setSelectedProduct(null);
    };

    const handleViewProduct = (product) => {
        setSelectedProduct(product);
        setShowProductTableview(true); // Membuka modal saat melihat produk
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Product List</h1>
            <button className="btn btn-primary mb-3" onClick={handleShowProductTable}>
                {showProductTableButton ? 'Hide Products' : 'Show Products'}
            </button>
            {showProductTableList ? (
                <table striped="true" bordered="true" hover="true" className="table" variant="dark">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="img-thumbnail"
                                        width="100"
                                    />
                                </td>
                                <td>{product.title}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>{product.stock}</td>
                                <td>${product.price}</td>
                                <td>
                                    <button
                                        className="btn btn-info"
                                        onClick={() => handleViewProduct(product)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
            <Modal
                show={showProductTableview}
                onHide={handleCloseProductTable}
                dialogClassName="modal-fullscreen"
                aria-labelledby="product-detail-modal-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="product-detail-modal-title">
                        {selectedProduct && selectedProduct.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct && (
                        <div className="product-details">
                            <div className="grid-container">
                                <div className="grid-left">
                                    <div className="product-thumbnail">
                                        <img src={selectedProduct.thumbnail} alt={selectedProduct.title} />
                                    </div>
                                    <div className="product-images">
                                        {selectedProduct.images.map((image, index) => (
                                            <img key={index} src={image} alt={`Product ${index + 1}`} />
                                        ))}
                                    </div>
                                </div>
                                <div className="grid-container">
                                    <div className="product-price-category">
                                        <p>Price: ${selectedProduct.price}</p>
                                        <p>Category: {selectedProduct.category}</p>
                                        <p>Stock: {selectedProduct.stock}</p>
                                        <p style={{ whiteSpace: 'nowrap' }}>Description: {selectedProduct.description}</p>
                                    </div>
                                    <div className="product-rating-brand">
                                        <StarRating rating={selectedProduct.rating} />
                                        <p>Brand: {selectedProduct.brand}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ProductList;