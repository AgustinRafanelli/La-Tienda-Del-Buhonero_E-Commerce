import styled from 'styled-components/macro';

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  margin: 0 15px;
  margin-bottom: 25px;
  border-radius: 10px;

  .img {
    object-fit: contain;
    margin: 20px;
  }

  .info {
    margin-left: 30px;
    text-align: left;

    .info__header {
      display: flex;
      align-items: center;
      font-size: 30px;

      .header__title {
        font-weight: bold;
        margin-right: 10px;
      }

      .header__brand {
        font-weight: bold;
        margin-right: 10px;
      }

      .header__stock {
        display: flex;
        align-items: center;
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
