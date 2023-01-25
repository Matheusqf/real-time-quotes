import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import * as C from "./styles";
import useAuth from "../../hooks/useAuth";
import { H1 } from "../../styles/_shared";
import Chart from "../../components/Chart";
import Button from "../../components/Button";
import Quotes from "../../components/Quotes";
import InactivityAlert from "../../components/InactivityAlert/InactivityAlert";

const Home = () => {
  const { signout } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [quoteCode, setQuoteCode] = useState("");
  const navigate = useNavigate();

  const handleSignOut = () => [signout(), navigate("/")];


  return (
    <>
      <C.Container>
        <C.Title>Cotações de hoje</C.Title>
        <InactivityAlert />
        <Quotes onClickOpenChart={quoteCode => {
          setShowDialog(true);
          setQuoteCode(quoteCode);
        }}/>
        <Button Text="Sair" onClick={handleSignOut}>
          Sair
        </Button>
      </C.Container>
      {showDialog && (
        <C.Dialog>
          <H1>GRÁFICO COM EVOLUÇÃO DOS VALORES</H1>
          <Chart quoteCode={quoteCode}></Chart>
          <Button onClick={() => setShowDialog(false)} Text="Close"></Button>
        </C.Dialog>
      )}
    </>
  );
};

export default Home;
