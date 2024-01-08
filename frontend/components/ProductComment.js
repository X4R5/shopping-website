import React, { useState, useEffect } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, FormControl } from 'react-bootstrap';

function ProductComment({ id, user, rating, comment, date, isAdmin }) {

  const [modalShow, setModalShow] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [adminReply, setAdminReply] = useState('');
  const [existingReply, setExistingReply] = useState(null);

  const token = localStorage.getItem('token');


  useEffect(() => {
    const fetchAndSetCommentData = async () => {
      const updatedCommentData = await fetchComment();
      if (updatedCommentData) {
        setLikes(updatedCommentData[0].likes);
        setDislikes(updatedCommentData[0].dislikes);
      }
    };

    fetchAndSetCommentData();
    fetchAdminReply();

  }, []);

  const handleAdminReply = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/comments/reply/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminReply: adminReply }),
      });

      if (!response.ok) throw new Error('Reply action failed.');

      const replyData = await response.json();
      setExistingReply(replyData.reply);
      setAdminReply('');
    } catch (error) {
      console.error('Error during reply action:', error);
    }
  };

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

  const fetchAdminReply = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/comments/reply/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch reply.');

      const data = await response.json();
      setExistingReply(data[0].adminReply || null);
    } catch (error) {
      console.error('Error fetching comment:', error);
      return null;
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

      {isAdmin && !existingReply && (
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Cevapla
      </Button>
    )}

      {existingReply && (
            <div className="mt-3">
              <h5>Cevap:</h5>
              <p>{existingReply}</p>
            </div>
          )}

{isAdmin && (
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Cevapla</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Cevabınızı giriniz."
                aria-label="Cevabınızı giriniz."
                aria-describedby="basic-addon2"
                value={adminReply}
                onChange={(e) => setAdminReply(e.target.value)}
              />
              <Button variant="outline-secondary" id="button-addon2" onClick={handleAdminReply}>
                Gönder
              </Button>
            </InputGroup>
            {existingReply && (
              <div className="mt-3">
                <h5>Cevap:</h5>
                <p>{existingReply}</p>
              </div>
            )}
          </Modal.Body>
        </Modal>
      )}


       

    </>
  );
}

export default ProductComment;
