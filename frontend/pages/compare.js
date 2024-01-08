import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

import { useState, useEffect } from 'react';


function ComparePage() {
    const [products, setProducts] = useState([]);
    const [commentCounts, setCommentCounts] = useState([]);
    const [ratings, setRatings] = useState([]);

    useEffect(() => {

        const savedIds = JSON.parse(localStorage.getItem('compareList')) || [];

        const fetchProducts = async () => {
        const fetchedProducts = await Promise.all(
            savedIds.map(async (id) => {
                const response = await fetch(`http://localhost:3001/api/products/${id}`);
                const product = await response.json();
                return product[0];
            })
        );
        setProducts(fetchedProducts);
        };

    const fetchCommentCounts = async () => {
        const fetchedCommentCounts = await Promise.all(
            savedIds.map(async (id) => {
                const response = await fetch(`http://localhost:3001/api/comments/totalcomments/${id}`);
                const comments = await response.json();
                return comments[0].count;
            })
        );
        setCommentCounts(fetchedCommentCounts);
        }

    const fetchRatings = async () => {
        const fetchedRatings = await Promise.all(
            savedIds.map(async (id) => {
                const response = await fetch(`http://localhost:3001/api/comments/${id}/rating`);
                const ratings = await response.json();
                return ratings[0];
            })
        );
        setRatings(fetchedRatings);
        }

    if (savedIds.length > 0) {
        fetchProducts();
        fetchCommentCounts();
        fetchRatings();
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Ürünlerin Karşılaştırılması:</h1>
        <div className="row">
          {products.map((product, index) => (
            <div key={product.id} className="d-flex col justify-content-center align-items-center">
                <h2>{index + 1}. {product.product_name}</h2>
                <img src={product.image} alt={product.name} />
                <p>Price: {product.product_price}</p>
                <p>Rating: {ratings[index]}</p>
                <p>Number of Reviews: {commentCounts[index]}</p>
                <p>Description: {product.description}</p>
                <hr />

            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ComparePage;
