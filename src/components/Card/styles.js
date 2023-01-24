import styled from "styled-components";

export const StyledCard = styled.div`
  border-radius: 0.2rem;
  min-width: 28rem;
  min-height: 260px;
  display: flex;
  width: 100px;
  flex-flow: column;
  text-align: center;
  width: 100%;
  height: 100%;

  @media screen and (min-width: 600px) {
    flex-direction: column;
    text-align: center;
    min-width: 14rem;
  }

  @media screen and (max-width: 460px) {
    min-width: unset;
  }

  .dashboard-card {
    &__body {
      display: flex;
      flex-flow: column;
      margin: 1rem;
      flex-grow: 1;
    }

    &__name {
      line-height: 1.4rem;
      flex: 1;
    }

    &__code {
      line-height: 1.2rem;
      margin: 0.5rem 0;
    }

    &__price-wrapper {
      flex: auto;
    }

    &__price,
    &__location {
      margin-top: 0.6rem;
      flex: auto;
    }

    &__btn {
      border: none;
      border-top: 1px solid #e1e5ee;
      background-color: #0a64a6;
      font-family: inherit;
      font-size: 1rem;
      font-weight: bold;
      color: #fff;
      width: 100%;
      padding-top: 1rem;
      padding-bottom: 1rem;
      cursor: pointer;

      &:hover {
        background-color: #0b73be;
      }
    }

    &.danger {
      box-shadow: 0 0 4px 2px #0a64a6;

      .variation {
        color: #fa5c7c;
      }
    }

    &.success {
      box-shadow: 0 0 4px 2px #0a64a6;

      .variation {
        color: #0acf97;
      }
    }
  }
`;
