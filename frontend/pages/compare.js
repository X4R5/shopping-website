import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';


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
                return comments[0].total_comments;
            })
        );
        setCommentCounts(fetchedCommentCounts);
        }

    const fetchRatings = async () => {
        const fetchedRatings = await Promise.all(
            savedIds.map(async (id) => {
                const response = await fetch(`http://localhost:3001/api/comments/${id}/rating`);
                const ratings = await response.json();
                let rating = 0;
                if(ratings[0].averageRating !== null){
                    rating = ratings[0].averageRating;
                }
                else{
                    rating = 0;
                }
                console.log(rating)
                return rating;
            })
        );
        setRatings(fetchedRatings);
        }

    if (savedIds.length > 0) {
        fetchProducts();
        fetchCommentCounts();
        fetchRatings();
        localStorage.removeItem('compareList');
    }
  }, []);

  return (
    <>
        <Navbar />
        <div className="container my-4">
            <h1 className="text-center mb-4">Ürünlerin Karşılaştırılması:</h1>
            <div className="row">
                {products.map((product, index) => (
                    <div key={product.id} className="col-md-6 d-flex justify-content-center">
                        <div className="card mb-4" style={{ width: "18rem" }}>
                            <img src={product.product_image} className="card-img-top" alt={product.product_name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.product_name}</h5>
                                <p className="card-text">Fiyat: {product.product_price} TL</p>
                                <p className="card-text">Rating: {ratings[index]}</p>
                                <p className="card-text">Yorum Sayısı: {commentCounts[index]}</p>
                                <p className="card-text">Açıklama: {product.product_desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
);
}

export default ComparePage;
