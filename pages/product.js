import React, { useState } from 'react';
import { Container, Row, Col, Image, Button, ListGroup, Card, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import ProductComment from '../components/ProductComment';
import Navbar from '../components/Navbar';

function ProductPage() {
  const [quantity, setQuantity] = useState(1); // Ürün miktarı için state
  const product = {
    name: 'Xiaomi Mi Robot Vacuum Mop 2 Pro',
    price: '8.999,00 TL',
    discountPrice: '8.599,00 TL',
    description: 'Akıllı Robot Süpürge - Siyah',
    imageUrl: 'https://parcs.org.au/wp-content/uploads/2016/03/placeholder-image-red-1.png',
    rating: 4.7,
    reviews: 1984,
  };

  // Yıldızları render etmek için bir fonksiyon
  const renderStars = () => {
    let stars = [];
    // Add full stars
    for (let i = 0; i < Math.floor(product.rating); i++) {
      stars.push(<FontAwesomeIcon key={`full${i}`} icon={faStar} style={{ color: 'orange' }} />); // Correct usage
    }
    // Add half star (if needed)
    if (product.rating % 1 >= 0.5) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} style={{ color: 'orange' }} />); // Correct usage
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
            <Image src={product.imageUrl} alt={product.name} fluid />
          </Col>
          <Col lg={6} className="d-flex">
            {/* Ürün Bilgileri */}
            <Card className="flex-grow-1 d-flex flex-column">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
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

      <ProductComment
        user={{ name: 'Jane Doe', photo: '' }} // No photo provided, will use initials
        rating={4.5}
        comment="Very happy with the purchase!"
        images={['https://parcs.org.au/wp-content/uploads/2016/03/placeholder-image-red-1.png', 'https://parcs.org.au/wp-content/uploads/2016/03/placeholder-image-red-1.png']}
        date="01/01/2024"
      />


    </>
  );
}

export default ProductPage;
