import styled from 'styled-components/macro';

export const StyledContainer = styled.div`
  .comment {
    display: flex;
    justify-content: center;

    .comment__input {
      margin-right: 5px;
      margin-bottom: 20px;
      border-radius: 5px;
      border: none;
      background-color: rgba(0, 0, 0, 0.05);
      padding: 5px;
    }

    .comment__button {
      cursor: pointer;
    }
  }

  .comments__button {
    margin-bottom: 15px;
    margin-left: -65px;
    color: white;
    background-color: rgba(0, 0, 0, 0.7);
    font-weight: bold;
    padding: 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      transition: all 0.2s ease-in-out;
      color: black;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  .comments__container {
    .comments__item {
      background-color: rgba(0, 0, 0, 0.05);
      margin: 0 3px;
      margin-bottom: 7px;
      font-size: 14px;
      text-align: left;
      padding: 5px;
      border-radius: 5px;
    }
  }
`;
