
import { StyledCard } from "./styles";
import styled from 'styled-components';
import { useState } from "react";
import Button from "../Button";
import { H1 } from "../../styles/_shared";
import Chart from "../Chart";

const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #ccc;

  @media screen and (max-width: 600px) {
    width: 90%;
  }
`;

function Card({ quote }) {
  const [showDialog, setShowDialog] = useState(false);

  const isCurrency = !!quote.buy;

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  return (
    <StyledCard>
      <div
        className={`dashboard-card ${
          quote.variation >= 0 ? "success" : "danger"
        }`}
      >
        <div className="dashboard-card__body">
          <h2 className="dashboard-card__code">{quote.code}</h2>
          <h4 className="dashboard-card__name">{quote.name}</h4>
          {!isCurrency && (
            <p className="dashboard-card__location">
              Localizaçāo: {quote.location}
            </p>
          )}
          <div className="dashboard-card__price-wrapper">
            {isCurrency ? (
              <>
                <h5 className="dashboard-card__price">Compra: {quote.buy}</h5>
                {quote.sell && (
                  <h5 className="dashboard-card__price">Venda: {quote.sell}</h5>
                )}
              </>
            ) : (
              <h5 className="dashboard-card__price">Pontos: {quote.points}</h5>
            )}
            <h5 className="dashboard-card__price variation">
              Variaçāo: {quote.variation} %
            </h5>
          </div>
        </div>
        <button className="dashboard-card__btn" onClick={handleOpenDialog}>Ver Gráfico</button>
      {showDialog && (
        <Dialog>
          <H1>GRÁFICO COM EVOLUÇÃO DOS VALORES</H1>
          <Chart quoteCode={quote.code}></Chart>
          <Button onClick={() => setShowDialog(false)} Text="Close"></Button>
        </Dialog>
      )}
      </div>
    </StyledCard>
  );
}

export default Card;
