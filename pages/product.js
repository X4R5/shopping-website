import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, ListGroup, Card, InputGroup, FormControl, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import ProductComment from '../components/ProductComment';
import Navbar from '../components/Navbar';

function ProductPage() {
  const [quantity, setQuantity] = useState(1);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('localhost:3001/api/products/1');
        if (!response.ok) throw new Error('Network response was not ok.');
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

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
            <Image src={product_image} alt={product.name} fluid />
          </Col>
          <Col lg={6} className="d-flex">
            {/* Ürün Bilgileri */}
            <Card className="flex-grow-1 d-flex flex-column">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>{product.name}</Card.Title>
                  <ListGroup className="list-group-flush my-3">
                    <ListGroup.Item>
                      <h5>Fiyat: <span className="text-muted text-decoration-line-through">{product.price}</span> <span className="text-success">{product.discountPrice}</span></h5>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="list-group-flush d-flex justify-content-start align-items-center">
                        <div className='mr-2'>{product.rating} {renderStars()}</div>
                        <div className='mx-2'>{product.reviews} Değerlendirme</div>
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
                    <Button className='mx-3 btn-orange' size="lg">Sepete Ekle</Button>
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
        <ProductComment
          user={{ name: 'huseyin ugur aydin', photo: '' }}
          rating={4.5}
          comment="cokiyi urun"
          images={[
            'https://parcs.org.au/wp-content/uploads/2016/03/placeholder-image-red-1.png',
            'https://parcs.org.au/wp-content/uploads/2016/03/placeholder-image-red-1.png'
          ]}
          date="01/01/2024"
        />
        </Card>
    </>
  );
}

export default ProductPage;