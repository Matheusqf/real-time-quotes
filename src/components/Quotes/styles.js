import styled, { keyframes } from "styled-components";

export const Subtitle = styled.h2`
  text-align: center;
  padding: 30px 0 10px;
`;

export const AllCards = styled.div`
  padding-bottom: 10px;
`;

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${spin} 0.8s linear infinite;
`;
