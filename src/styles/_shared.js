import styled from "styled-components";

export const H1 = styled.h1`
    display: flex;
    flex-flow: column;
    text-align: center;
    padding: 30px 0 10px;
    font-size: 1.8rem;

    @media screen and (max-width: 600px) {
        font-size: 1.4rem;
    }
`;