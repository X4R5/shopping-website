import React, { useState, useEffect } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function ProductComment({ id, user, rating, comment, date }) {

  const [modalShow, setModalShow] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const token = localStorage.getItem('token');

  const updateLikesDislikes = async () => {
    const updatedComment = await fetchComment();
    if (updatedComment) {
      setLikes(updatedComment[0].likes);
      setDislikes(updatedComment[0].dislikes);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/comments/like/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Like action failed.');

      await updateLikesDislikes();
    } catch (error) {
      console.error('Error during like action:', error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/comments/dislike/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Dislike action failed.');

      await updateLikesDislikes();
    } catch (error) {
      console.error('Error during dislike action:', error);
    }
  };

  const fetchComment = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/comments/total/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch comment.');

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching comment:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAndSetComment = async () => {
      const updatedComment = await fetchComment();
      if (updatedComment) {
        setLikes(updatedComment[0].likes);
        setDislikes(updatedComment[0].dislikes);
        console.log(updatedComment);
        console.log(id);
      }
    };

    // Call the fetchComment function when the component mounts
    fetchAndSetComment();
  }, []); 

  

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
          
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductComment;
