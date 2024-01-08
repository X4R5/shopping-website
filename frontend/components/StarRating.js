import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

function StarRating({ rating, setRating }) {
    const changeRating = (newRating) => {
      setRating(newRating);
    };
  
    return (
      <div>
        {[1, 2, 3, 4, 5].map((star, index) => {
          return (
            <FontAwesomeIcon
              key={index}
              icon={star <= rating ? faStar : faStarHalfAlt}
              style={{ color: star <= rating ? 'orange' : 'grey' }}
              onClick={() => changeRating(star)}
            />
          );
        })}
      </div>
    );
  }

    export default StarRating;