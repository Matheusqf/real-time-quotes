import React, { useEffect, useState } from "react";
import axios from "axios";
import * as C from "./styles";
import Card from "../../components/Card";
import { H1 } from "../../styles/_shared";
import useAuth from "../../hooks/useAuth";

const Quotes = ({ onClickOpenChart }) => {
  const currencyHistory = JSON.parse(
    sessionStorage.getItem("currency_history") || "[]"
  );

  const offlineQuotes = {
      currencies: {
        source: "BRL",
        USD: {
          name: "Dollar",
          buy: 5.2078,
          sell: 5.2078,
          variation: 0.162,
        },
        EUR: {
          name: "Euro",
          buy: 5.6614,
          sell: 5.6616,
          variation: 0.17,
        },
        GBP: {
          name: "Pound Sterling",
          buy: 6.4478,
          sell: null,
          variation: 0.213,
        },
        ARS: {
          name: "Argentine Peso",
          buy: 0.0282,
          sell: null,
          variation: 0.172,
        },
        CAD: {
          name: "Canadian Dollar",
          buy: 3.8938,
          sell: null,
          variation: 0.074,
        },
        AUD: {
          name: "Australian Dollar",
          buy: 3.6602,
          sell: null,
          variation: 0.174,
        },
        JPY: {
          name: "Japanese Yen",
          buy: 0.0399,
          sell: null,
          variation: 0.18,
        },
        CNY: {
          name: "Renminbi",
          buy: 0.7676,
          sell: null,
          variation: 0.157,
        },
        BTC: {
          name: "Bitcoin",
          buy: 126735.141,
          sell: 126735.141,
          variation: -0.13,
        },
      },
      stocks: {
        IBOVESPA: {
          name: "BM\u0026F BOVESPA",
          location: "Sao Paulo, Brazil",
          points: 111737.28,
          variation: -0.27,
        },
        IFIX: {
          name: "Índice de Fundos de Investimentos Imobiliários B3",
          location: "Sao Paulo, Brazil",
          points: 2815.86,
          variation: -0.38,
        },
        NASDAQ: {
          name: "NASDAQ Stock Market",
          location: "New York City, United States",
          points: 11364.41,
          variation: 2.01,
        },
        DOWJONES: {
          name: "Dow Jones Industrial Average",
          location: "New York City, United States",
          points: 33629.56,
          variation: 0.76,
        },
        CAC: {
          name: "CAC 40",
          location: "Paris, French",
          points: 7032.02,
          variation: 0.52,
        },
        NIKKEI: {
          name: "Nikkei 225",
          location: "Tokyo, Japan",
          points: 26906.04,
          variation: 1.33,
        },
      },
      available_sources: ["BRL"],
      taxes: [],
    };

  // Dashboard Functions
  // const [quotes, setQuotes] = useState({});
  const [quotes, setquotes] = [offlineQuotes]
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const sourceCurrency = quotes?.currencies?.source;

  const { isUserActive } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (isUserActive) {
          // const response = await axios.get(
          //   "https://api.hgbrasil.com/finance?key=32d8f785&format=json-cors"
          // );
          // setQuotes(response.data.results);

          // sessionStorage.setItem(
          //   "currency_history",
          //   JSON.stringify([...currencyHistory, response.data.results])
          // );
        }
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    //Fetch data immediately on first load
    fetchData();

    //Fetch data every 40 seconds
    const intervalId = setInterval(fetchData, 40000);

    // clearInterval(intervalId);

    return () => clearInterval(intervalId);
  }, [isUserActive]);

  if (error) {
    return <H1>{error.message}</H1>;
  }

  const currencies =
    quotes?.currencies &&
    Object.entries(quotes?.currencies)
      .filter(([key, currency]) => key !== "source" && currency.name)
      .map(([key, currency]) => ({ ...currency, code: key }));

  const stocks =
    quotes?.stocks &&
    Object.entries(quotes.stocks)
      .filter(([key, stock]) => key !== "source" && stock.name)
      .map(([key, stock]) => ({ ...stock, code: key }));

  return (
    <>
      {isLoading && (
        <C.Overlay>
          <C.Spinner />
        </C.Overlay>
      )}
      <C.AllCards>
        <C.Subtitle>Moedas / {sourceCurrency}</C.Subtitle>
        <div className="wrapper">
          {currencies?.map((quote) => (
            <Card
              key={quote.code}
              quote={quote}
              onClickOpenChart={onClickOpenChart}
            />
          ))}
        </div>

        <C.Subtitle>Ações</C.Subtitle>
        <div className="wrapper">
          {stocks?.map((quote) => (
            <Card
              key={quote.code}
              quote={quote}
              onClickOpenChart={onClickOpenChart}
            />
          ))}
        </div>
      </C.AllCards>
    </>
  );
};

export default Quotes;
