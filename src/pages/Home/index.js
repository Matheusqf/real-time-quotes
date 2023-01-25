import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../components/Button";
import * as C from "./styles";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Card from "../../components/Card";
import "./styles.css";
import InactivityAlert from "../../components/InactivityAlert/InactivityAlert";
import { H1 } from "../../styles/_shared";


const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  // Dashboard Functions
  const [quotes, setQuotes] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const sourceCurrency = quotes?.currencies?.source;
  const currencyHistory = JSON.parse(sessionStorage.getItem("currency_history") || "[]");

  useEffect(() => {
   const fetchData = async () => {
     setIsLoading(true);
     try {
       const response = await axios.get(
         "https://cors-anywhere.herokuapp.com/https://api.hgbrasil.com/finance?key=32d8f785"
       );
       setQuotes(response.data.results);
       
       sessionStorage.setItem("currency_history", JSON.stringify([...currencyHistory, response.data.results]));
     } catch (error) {
       setError(error);
     }
     setIsLoading(false);
   };

   //Fetch data immediately on first load
   fetchData();

   //Fetch data every 40 seconds
   const intervalId = setInterval(fetchData, 40000);

   return () => clearInterval(intervalId);
 }, []);

  if (error) {
    return <H1>{error.message}</H1>;
  }
  if (isLoading) {
    return <H1>Loading...</H1>;
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

  const handleSignOut = () => [signout(), navigate("/")];

  return (
    <C.Container>
      <C.Title>Cotações de hoje</C.Title>
      <InactivityAlert />
      <C.AllCards>

        <C.Subtitle>Moedas / {sourceCurrency}</C.Subtitle>
        <div className="wrapper">
          {currencies?.map((quote) => (
            <Card key={quote.code} quote={quote} />
          ))}
        </div>

        <C.Subtitle>Ações</C.Subtitle>
        <div className="wrapper">
          {stocks?.map((quote) => (
            <Card key={quote.code} quote={quote} />
          ))}
        </div>

      </C.AllCards>

      <Button Text="Sair" onClick={handleSignOut}>
        Sair
      </Button>
    </C.Container>
  );
};

export default Home;
