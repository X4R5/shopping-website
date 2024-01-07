import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Image, Button, ListGroup, Card, InputGroup, FormControl, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import ProductComment from '../../components/ProductComment';
import Navbar from '../../components/Navbar';

function ProductPage() {
  const router = useRouter();
  const { id } = router.query; 

  const [quantity, setQuantity] = useState(1);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);


  // const product1 = {
  //   product_name: 'Xiaomi Mi Robot Vacuum Mop 2 Pro',
  //   price: '8.999,00 TL',
  //   discountPrice: '8.599,00 TL',
  //   product_desc: 'Akıllı Robot Süpürge - Siyah',
  //   product_image: 'https://parcs.org.au/wp-content/uploads/2016/03/placeholder-image-red-1.png',
  //   rating: 4.7,
  //   reviews: 1984,
  // };


  useEffect(() => {
    if(id) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:3001/api/products/${id}`);
          if (!response.ok) throw new Error('Network response was not ok.');
          const data = await response.json();
          setProduct(data[0]);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/comments//${id}/`);
        if (!response.ok) throw new Error('Network response was not ok.');
        const data = await response.json();
        setComments(data);
      } catch (error) {
        setError(error.message);
      }
    };
  
    if(id) {
      fetchComments();
    }
  }, [id]);
  

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const productToAdd = {
      productId: id,
      quantity: quantity,
    };
  
    const updatedCart = [...cart, productToAdd];
  
    try {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      alert("Ürün başarıyla sepete eklendi!");
    } catch (error) {
      console.error('Sepete ekleme sırasında bir hata oluştu:', error);
      alert("Sepete ekleme sırasında bir hata oluştu.");
    }
  }
  
  


  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       setProduct(product1);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchProduct();
  // }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found!</div>;

  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < Math.floor(product.rating); i++) {
      stars.push(<FontAwesomeIcon key={`full${i}`} icon={faStar} style={{ color: 'orange' }} />);
    }
    if (product.rating % 1 >= 0.5) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} style={{ color: 'orange' }} />);
    }
    return stars;
  };


  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  }

  return (
    <>
      <Navbar />
      <Container className="my-5">
        <Row>
          <Col lg={6}>
            {/* Ürün Resmi */}
            <Image src={product.product_image} alt={product.product_name} fluid />
          </Col>
          <Col lg={6} className="d-flex">
            {/* Ürün Bilgileri */}
            <Card className="flex-grow-1 d-flex flex-column">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>{product.product_name}</Card.Title>
                  <ListGroup className="list-group-flush my-3">
                    <ListGroup.Item>
                      <h5>Fiyat: <span className="text-muted text-decoration-line-through">{product.product_price}</span> <span className="text-success">{product.discountPrice}</span></h5>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="list-group-flush d-flex justify-content-start align-items-center">
                        {/* <div className='mr-2'>{product.rating} {renderStars()}</div> */}
                        {/* <div className='mx-2'>{product.reviews} Değerlendirme</div> */}
                      </div>
                  </ListGroup.Item>
                  </ListGroup>
                </div>
                <div className="mt-auto">
                  <div className="d-flex justify-content-around my-3">
                    <Button variant="outline-secondary" size="md">Listeme Ekle</Button>
                    <Button variant="outline-secondary" size="md">Karşılaştır</Button>
                  </div>
                  <div className='d-flex flex-row align-items-center justify-content-center'>
                    <InputGroup className="w-25 mx-3">
                      <InputGroup.Text onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}>-</InputGroup.Text>
                      <FormControl className='text-center' value={quantity} onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}/>
                      <InputGroup.Text onClick={() => handleQuantityChange(quantity + 1)}>+</InputGroup.Text>
                    </InputGroup>
                    <Button className='mx-3 btn-orange' size="lg" onClick={handleAddToCart}>Sepete Ekle</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

       <Card className="mx-5 my-3" style={{ minHeight: '200px' }}>
          <Card.Body>
            <Card.Title className='my-2'>Ürün Açıklaması</Card.Title>
            <Card.Text className='my-3'>{product.product_desc}</Card.Text>
          </Card.Body>
        </Card>

        <Card className="mx-5 my-3" style={{ minHeight: '200px' }}>
        <Card.Body>
            <Card.Title className='my-2'>Ürün Yorumları</Card.Title>
          </Card.Body>
          {comments.map(comment => (
          <ProductComment
            key={comment.id}
            id={comment.id}
            user={{ name: comment.name, photo: '' }}
            rating={comment.rating}
            comment={comment.comment}
          />
        ))}

        </Card>
    </>
  );
}

export default ProductPage;