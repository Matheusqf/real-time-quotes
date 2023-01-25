import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  padding-bottom: 20px;
`;

export const Title = styled.h1`
  text-align: center;
  padding: 30px 0;
  background-color: #0a64a6;
  color: #fff;
`;

export const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #ccc;
  text-align: center;

  @media screen and (max-width: 600px) {
    width: 90%;
  }
`;
