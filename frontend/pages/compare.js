import React from 'react';

function ComparePage() {
    const [compareProducts, setcompareProducts] = useState([]);

    useEffect(() => {
        setcompareProducts(JSON.parse(localStorage.getItem('compareList')));
    }, []);
  return (
    <div>
      <h1>Compare Page</h1>
        {compareProducts.map((product, index) => (
            <div key={product.id}>
            <h2>{index+1}. {product.id}</h2>
            <hr />
            <br />
            </div>
        ))}
    </div>
  );
}

export default ComparePage;
