import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';

function CategoryPage() {
    const router = useRouter();
    const { id } = router.query;

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/products/category/${id}`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [id]);

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="row">
                    {products.map(product => (
                        <div className="col-md-4 mb-3" key={product.product_id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default CategoryPage;
