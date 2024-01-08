import React from 'react';
import { useState, useEffect } from 'react';

function ComparePage() {
    const [compareProducts, setcompareProducts] = useState([]);

    useEffect(() => {
        setcompareProducts(JSON.parse(localStorage.getItem('compareList')));
        // delete from local storage
        localStorage.removeItem('compareList');
    }, []);
  return (
    <div>
      <h1>Compare Page</h1>
        {compareProducts.map((product, index) => (
            <div key={product}>
            <h2>{index+1}. {product}</h2>
            <hr />
            <br />
            </div>
        ))}
    </div>
  );
}

export default ComparePage;
