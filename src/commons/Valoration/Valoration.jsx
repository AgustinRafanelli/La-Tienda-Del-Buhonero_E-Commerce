import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StyledContainer } from './style';

function Valoration({ id }) {
  const [valoration, setValoration] = useState(0);
  const [rating, setRating] = useState({
    sum: 0,
    length: 0,
  });

  const navigate = useNavigate();

  const user = useSelector(state => state.user);

  const handleClick = starId => {
    if (!user.id) navigate('/signIn');
    if (!valoration) {
      return axios
        .post(`/api/reviews/valorations/${id}`, {
          valoration: starId,
          ratingSum: rating.sum + starId,
          ratingLength: rating.length + 1,
        })
        .then(res => res.data)
        .then(() => {
          setValoration(starId);
          setRating({
            sum: rating.sum + starId,
            length: rating.length + 1,
          });
        });
    } else {
      return axios
        .put(`/api/reviews/valorations/${id}`, {
          valoration: starId,
          ratingSum: rating.sum + starId,
          ratingLength: rating.length + 1,
        })
        .then(res => res.data)
        .then(() => {
          setValoration(starId);
          setRating({
            sum: rating.sum + starId,
            length: rating.length + 1,
          });
        });
    }
  };

  useEffect(() => {
    if (!user.id) return;
    return axios
      .get(`/api/reviews/valorations/${id}`)
      .then(res => res.data)
      .then(review => {
        setValoration(review.valoration);
        setRating({
          sum: review.ratingSum,
          length: review.ratingLength,
        });
      });
  }, [id, user]);

  return (
    <StyledContainer>
      <div>
        {[1, 2, 3, 4, 5].map(starId => (
          <StarIcon
            key={starId}
            onClick={() => handleClick(starId)}
            className='star'
            style={
              user.id
                ? valoration >= starId
                  ? { color: 'yellow' }
                  : { color: 'gray' }
                : { color: 'gray' }
            }
          />
        ))}
      </div>
      {user.id ? (
        rating.sum ? (
          <span>Average {Math.round(rating.sum / rating.length)}</span>
        ) : null
      ) : null}
    </StyledContainer>
  );
}

export default Valoration;
