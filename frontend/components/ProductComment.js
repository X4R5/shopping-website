import React, { useState } from 'react';
import { Card, ListGroup, ListGroupItem, Row, Col, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function ProductComment({ id, user, rating, comment, images, date }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);


  const handleLike = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/comments/${id}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) throw new Error('Beğenme işlemi başarısız.');
  
      // Beğeni sayısını güncellemek için yeni bir istek at
      const updatedComment = await fetchComment();
      setLikes(updatedComment.likes);
      setDislikes(updatedComment.dislikes);
    } catch (error) {
      console.error('Beğenme işleminde hata oluştu:', error);
    }
  };
  
  const handleDislike = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/comments/${id}/dislike`, { 
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) throw new Error('Beğenmeme işlemi başarısız.');
  
      const updatedComment = await fetchComment();
      setLikes(updatedComment.likes);
      setDislikes(updatedComment.dislikes);
    } catch (error) {
      console.error('Beğenmeme işleminde hata oluştu:', error);
    }
  };
  
  const fetchComment = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/comments/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) throw new Error('Yorum bilgisi çekilemedi.');
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Yorum bilgisi çekerken hata oluştu:', error);
      return null;
    }
  };
  

  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'orange' }} />);
    }
    if (rating % 1 >= 0.5) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} style={{ color: 'orange' }} />);
    }
    return stars;
  };

  // Placeholder for the user's initials
  const renderInitials = (name) => {
    let initials = name.split(' ').map((n) => n[0]).join('');
    return (
      <div className="initials-placeholder" style={{ background: 'grey', color: 'white', borderRadius: '50%', textAlign: 'center', lineHeight: '40px', height: '40px', width: '40px' }}>
        {initials}
      </div>
    );
  };

  return (
    <>
      <Card className="my-3 mx-5">
        <Card.Body>
          <Card.Title className='d-flex flex-row justify-content-start align-items-center'>
            {user.photo ? (
              <div>
                <img
                  src={user.photo}
                  alt={`${user.name} profile`}
                  className="img-fluid rounded-circle"
                  style={{ width: '40px', height: '40px' }}
                />
              </div>
            ) : (
              <div>
                {renderInitials(user.name)}
              </div>
            )}

            <span className="ms-2">{user.name}</span>
            <span className="ms-2 text-muted">{date}</span>
          </Card.Title>
          <Card.Subtitle className="my-2">{rating} {renderStars()}</Card.Subtitle>
          <Card.Text>{comment}</Card.Text>
        </Card.Body>

        <Card.Footer>
          <Button variant="success" className="me-2" onClick={handleLike}>
            <FontAwesomeIcon icon={faThumbsUp} /> Beğen ({likes})
          </Button>
          <Button variant="danger" onClick={handleDislike}>
            <FontAwesomeIcon icon={faThumbsDown} /> Beğenme ({dislikes})
          </Button>
        </Card.Footer>
      </Card>

      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          {selectedImg && <img src={selectedImg} alt="Enlarged comment attachment" className="img-fluid" />}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductComment;
