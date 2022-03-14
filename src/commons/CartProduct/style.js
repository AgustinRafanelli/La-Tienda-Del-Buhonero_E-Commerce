import styled from 'styled-components/macro';

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  margin: 0 15px;
  margin-bottom: 10px;
  border-radius: 10px;

  .img {
    max-height: 8em;
    object-fit: contain;
    margin: 10px;
  }

  .info {
    margin-left: 10px;
    text-align: left;

    .info__header {
      display: flex;
      align-items: center;
      line-height: 20px;
      font-size: 30px;
      

      .header__title {
        font-weight: bold;
        margin: 0.3em;
      }

      .header__brand {
        font-weight: bold;
        margin: 10px;
      }

      .header__stock {
        display: flex;
        align-items: center;
        margin: 10px;
        button {
          font-weight: bold;
          padding: 5px 0;
          margin: 0 5px;
          border-radius: 5px;
          border: none;
          width: 25px;
          transition: all 0.2s ease-in-out;

          &:hover {
            cursor: pointer;
            color: white;
            background-color: rgba(0, 0, 0, 0.5);
          }
        }
      }
    }

    .info__model {
      margin-top: 0;
    }

    .info__description {
    }

    .info__price {
    }
  }
`;
