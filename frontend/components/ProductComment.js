import React, { useState } from 'react';
import { Card, ListGroup, ListGroupItem, Row, Col, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function ProductComment({ user, rating, comment, images, date }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  // Generates the star rating visualization
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

  const handleImageClick = (img) => {
    setSelectedImg(img);
    setModalShow(true);
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
        {images && images.length > 0 && (
          <ListGroup className="list-group-flush">
            <div className='d-flex flex-row'>
              {images.map((img, index) => (
                <div className="mx-2">
                  <img
                    src={img}
                    alt={`Comment attachment ${index}`}
                    className="img-fluid my-2 mx-2"
                    onClick={() => handleImageClick(img)}
                    style={{ cursor: 'pointer', height: '100px', width: '100px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </ListGroup>
        )}

        <Card.Footer>
          <Button variant="success" className="me-2">
            <FontAwesomeIcon icon={faThumbsUp} /> Beğen ({likes})
          </Button>
          <Button variant="danger">
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
