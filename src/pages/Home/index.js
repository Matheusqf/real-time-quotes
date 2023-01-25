import React from "react";
import Button from "../../components/Button";
import * as C from "./styles";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./styles.css";
import InactivityAlert from "../../components/InactivityAlert/InactivityAlert";
import Quotes from "../../components/Quotes";


const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => [signout(), navigate("/")];

  return (
    <C.Container>
      <C.Title>Cotações de hoje</C.Title>
      <InactivityAlert />
      <Quotes />
      <Button Text="Sair" onClick={handleSignOut}>
        Sair
      </Button>
    </C.Container>
  );
};

export default Home;
