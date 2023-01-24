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
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://cors-anywhere.herokuapp.com/https://api.hgbrasil.com/finance"
        );
        setQuotes(response.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (error) {
    return <H1>{error.message}</H1>;
  }
  if (isLoading) {
    return <H1>Loading...</H1>;
  }

  const currencies =
    quotes?.results?.currencies &&
    Object.entries(quotes.results.currencies)
      .filter(([key, currency]) => key !== "source" && currency.name)
      // .slice(0, 5)
      .map(([key, currency]) => ({ ...currency, code: key }));

  const stocks =
    quotes?.results?.stocks &&
    Object.entries(quotes.results.stocks)
      .filter(([key, stock]) => key !== "source" && stock.name)
      // .slice(0, 5)
      .map(([key, stock]) => ({ ...stock, code: key }));

  const handleSignOut = () => [signout(), navigate("/")];

  return (
    <C.Container>
      <C.Title>Cotações de hoje</C.Title>
      <InactivityAlert />
      <C.AllCards>

        <C.Subtitle>Moedas</C.Subtitle>
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
