import styled from "styled-components/macro";

export const StyledContainer = styled.div`
  width: 90%;
  margin: 0 auto;

  .title {
      text-align: left;
      margin: 30px 0;
      margin-left: 20px;
  }

  .container {
    .container__list {
      background-color: rgba(0, 0, 0, 0.05);
        display:flex;
        justify-content: space-between;
        padding: 15px;
        font-size: 18px;
        align-items: center;
        border-radius: 5px;

        .list__description {

            .description__name {
                margin-right: 40px;
            }

            .description__email {
                margin-right: 40px;
            }
        }
        .list__actions {
            .actions__upgrade {
                margin-right: 20px;
                background-color: green;

            }

            .actions__downgrade {
                background-color: red;
            }
            .btn{
                font-weight: bold;
                font-size: 18px;
                color: white;
                border: none;
                padding: 10px;
                border-radius: 5px;

                &:hover{
                    transition: all 0.2s ease-in-out;
                    background-color: rgba(0, 0, 0, 0.85);
                    cursor: pointer;
                }
            }
        }
    }
  }
`;
