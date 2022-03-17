import React, { useState } from 'react';
import { StyledContainer } from './style';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { useNavigate } from 'react-router-dom';

function Comment({ id }) {
  const [comments, setComments] = useState([]);
  const [active, setActive] = useState(false);

  const user = useSelector(state => state.user);

  const { name, value, handleChange, reset } = useInput('inputComent');

  const navigate = useNavigate();

  const handleAddComment = () => {
    if (!user.id) navigate('/signIn');
    if (!value) return;
    return axios
      .post(`/api/reviews/comments/${id}`, { comment: value })
      .then(res => {
        setComments(res.data);
        reset('');
      });
  };

  const handleShowComments = () => {
    if (!user.id) navigate('/signIn');
    return axios.get(`/api/reviews/comments/${id}`).then(res => {
      setComments(res.data);
      setActive(!active);
    });
  };

  return (
    <StyledContainer>
      <div className='comment'>
        <input
          type='text'
          placeholder='Add a comment'
          className='comment__input'
          name={name}
          value={value}
          onChange={handleChange}
        />
        <InsertCommentOutlinedIcon
          className='comment__button'
          onClick={handleAddComment}
        />
      </div>
      <button className='comments__button' onClick={handleShowComments}>
        {active ? 'Hide comments' : 'Show comments'}
      </button>
      {active &&
        (comments.length ? (
          <div className='comments__container'>
            {comments.map((comment, i) => (
              <p key={i} className='comments__item'>
                {comment}
              </p>
            ))}
          </div>
        ) : (
          <p>There are no comments</p>
        ))}
    </StyledContainer>
  );
}

export default Comment;
