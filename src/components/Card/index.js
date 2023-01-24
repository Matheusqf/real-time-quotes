
import { StyledCard } from "./styles";

function Card({ quote }) {
  const isCurrency = !!quote.buy;

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
        <button className="dashboard-card__btn">Ver Gráfico</button>
      </div>
    </StyledCard>
  );
}

export default Card;
