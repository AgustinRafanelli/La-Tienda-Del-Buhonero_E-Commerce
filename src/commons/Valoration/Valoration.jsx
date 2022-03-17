import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StyledContainer } from './style';

function Valoration({ id }) {
  const [valoration, setValoration] = useState(0);
  const [average, setAverage] = useState(0);

  const navigate = useNavigate();

  const user = useSelector(state => state.user);

  const getAverage = id => {
    return axios.get(`/api/reviews/valorations/average/${id}`).then(res => {
      setAverage(parseInt(res.data));
    });
  };

  const handleClick = starId => {
    if (!user.id) navigate('/signIn');
    if (!valoration) {
      return axios
        .post(`/api/reviews/valorations/${id}`, { valoration: starId })
        .then(res => {
          setValoration(parseInt(res.data));
        })
        .then(() => getAverage(id));
    } else {
      return axios
        .put(`/api/reviews/valorations/${id}`, { valoration: starId })
        .then(res => {
          setValoration(parseInt(res.data));
        })
        .then(() => getAverage(id));
    }
  };

  useEffect(() => {
    return getAverage(id);
  }, [id]);

  useEffect(() => {
    if (!user.id) return;
    return axios.get(`/api/reviews/valorations/${id}`).then(res => {
      setValoration(parseInt(res.data));
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
      <span>Average {average}</span>
    </StyledContainer>
  );
}

export default Valoration;
