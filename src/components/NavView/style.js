import styled from 'styled-components/macro';

export const StyledContainer = styled.div`
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .leftSide__container {
      display: flex;
      align-items: center;

      .leftSide__title {
      }
    }

    .rightSide__container {
      display: flex;
      align-items: center;

      .login {
        margin-left: 30px;
        font-weight: bold;
      }
      .cart {
        margin-left: 10px;
        color: white;
        font-weight: bold;

        .cart__description {
          margin-left: 2.5px;

          .cart__description-lowercase {
            text-transform: lowercase;
          }
        }
      }
    }
  }
`;
