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

  // Dashboard Functions
  const [quotes, setQuotes] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const sourceCurrency = quotes?.currencies?.source;

  const { isUserActive } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (isUserActive) {
          const response = await axios.get(
            "https://api.hgbrasil.com/finance?key=fb33dfa4&format=json-cors"
          );
          setQuotes(response.data.results);

          sessionStorage.setItem(
            "currency_history",
            JSON.stringify([...currencyHistory, response.data.results])
          );
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
