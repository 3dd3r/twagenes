import styled from 'styled-components';

export const HomePageStyle = styled.div`
  /* display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, minmax(auto, 1fr)); */

  margin: 20px;
  padding: 20px;
  text-align: center;

  .tagines {
    display: flex;
    justify-content: space-around;
  }

  span {
    color: var(--red);
  }

  h3 {
    margin: 20px 0;
    background-color: var(--yellow);
  }
  h2 {
    margin-top: 15px;
  }

  img {
    border-radius: 20px;
  }
`;
