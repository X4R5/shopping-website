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

  const [rating, setRating] = useState(0);
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

  const fetchAndSetRating = async () => {
    try {
        const updatedRating = await fetch(`http://localhost:3001/api/comments/${id}/rating`);
        
        if (!updatedRating.ok) {
            throw new Error('Failed to fetch rating.');
        }

        const data = await updatedRating.json();
        setRating(data[0].averageRating);
    } catch (error) {
        console.error('Error fetching rating:', error);
    }
};

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
      fetchAndSetRating();
    }
  }, [id]);

  useEffect(() => {
  
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
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<FontAwesomeIcon key={`full${i}`} icon={faStar} style={{ color: 'orange' }} />);
    }
    if (rating % 1 >= 0.5) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} style={{ color: 'orange' }} />);
    }
    return stars;
  };




  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  }

<<<<<<< Updated upstream
=======
  const sortComments = (sortType) => {
    let sortedComments = [];
    switch(sortType) {
      case 'rating':
        sortedComments = [...comments].sort((a, b) => b.rating - a.rating);
        break;
      case 'likes':
        sortedComments = [...comments].sort((a, b) => b.likes - a.likes);
        break;
      case 'dislikes':
        sortedComments = [...comments].sort((a, b) => b.dislikes - a.dislikes);
        break;
      default:
        sortedComments = [...comments];
    }
    setComments(sortedComments);
  }

  const fetchSortedComments = async (sortOption) => {
    let sortDirection;

    switch(sortOption) {
      case 'rating':
        sortDirection = sortRatingDirection;
        setSortRatingDirection(sortRatingDirection === 'desc' ? 'ascend' : 'desc');
        break;
      case 'like':
        sortDirection = sortLikesDirection;
        setSortLikesDirection(sortLikesDirection === 'desc' ? 'ascend' : 'desc');
        break;
      case 'dislike':
        sortDirection = sortDislikesDirection;
        setSortDislikesDirection(sortDislikesDirection === 'desc' ? 'ascend' : 'desc');
        break;
      default:
        // Default direction or handling
    }

    try {
      const response = await fetch(`http://localhost:3001/api/comments/filter/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sort_option: sortOption + "_" + sortDirection  }),
      });
      if (!response.ok) throw new Error('Failed to fetch sorted comments.');

      const sortedComments = await response.json();
      setComments(sortedComments);
    } catch (error) {
      console.error('Error fetching sorted comments:', error);
      setError(error.message);
    }
  };


  const postComment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/comments/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({product_id: id, comment: newComment, rating: newRating }),
      });
      if (!response.ok) throw new Error('Comment post failed.');

      setNewComment('');
      setNewRating(0);
      fetchComments()
    } catch (error) {
      console.error('Error posting comment:', error);
      alert("Error posting comment");
    }
  }


  const handleAddToCompare = () => {
    const maxCompareItems = 2;
    let compareList = JSON.parse(localStorage.getItem('compareList')) || [];
  
    if (!compareList.includes(id)) {
      if (compareList.length < maxCompareItems) {
        compareList.push(id);
        localStorage.setItem('compareList', JSON.stringify(compareList));
        alert("Ürün karşılaştırmaya eklendi!");
      } else {
        alert("En fazla 2 ürün karşılaştırabilirsiniz!");
      }
    } else {
      alert("Ürün zaten karşılaştırmada!");
    }
  
    if (compareList.length >= 2) {
      router.push('/compare');
    }
  };
  

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                        {/* <div className='mr-2'>{product.rating} {renderStars()}</div> */}
=======
                        <div className='mr-2'>{rating} {renderStars()}</div>
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
        <Card className="mx-5 my-3" style={{ minHeight: '200px' }}>
=======

        {/* <Row className="justify-content-center my-3">
          <ButtonGroup>
            <Button variant="outline-secondary" onClick={() => sortComments('rating')}>Rating</Button>
            <Button variant="outline-secondary" onClick={() => sortComments('likes')}>Likes</Button>
            <Button variant="outline-secondary" onClick={() => sortComments('dislikes')}>Dislikes</Button>
          </ButtonGroup>
        </Row> */}

        <Row className="justify-content-center my-3">
          <ButtonGroup>
            <Button variant="outline-secondary" onClick={() => fetchSortedComments('date')}>X</Button>
            <Button variant="outline-secondary" onClick={() => fetchSortedComments('rating')}>Rating</Button>
            <Button variant="outline-secondary" onClick={() => fetchSortedComments('like')}>Likes</Button>
            <Button variant="outline-secondary" onClick={() => fetchSortedComments('dislike')}>Dislikes</Button>
          </ButtonGroup>
        </Row>
      {/* Comments Section */}
      <Card className="mx-5 my-3" style={{ minHeight: '200px' }}>
>>>>>>> Stashed changes
        <Card.Body>
            <Card.Title className='my-2'>Ürün Yorumları</Card.Title>
          </Card.Body>
          {comments.map(comment => (
          <ProductComment
            key={comment.comment_id}
            id={comment.comment_id}
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