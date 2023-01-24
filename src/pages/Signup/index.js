import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSignup = () => {
    if (!email || !emailConf || !password) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf) {
      setError("Os emails nāo sāo iguais");
      return;
    }
    setIsLoading(true);
    const res = signup(email, password);
    setIsLoading(false);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadastrado com sucesso!");
    navigate("/");
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  }

  return (
    <C.Container>
      <C.Label>SISTEMA DE LOGIN</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
          onKeyDown={handleInputKeyDown}
        />
        <Input
          type="email"
          placeholder="Confirme seu email"
          value={emailConf}
          onChange={(e) => [setEmailConf(e.target.value), setError("")]}
          onKeyDown={handleInputKeyDown}
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => [setPassword(e.target.value), setError("")]}
          onKeyDown={handleInputKeyDown}
        />
        <C.LabelError>{error}</C.LabelError>
        <Button
          Text="Increver-se"
          onClick={handleSignup}
          isLoading={isLoading}
        />
        <C.LabelSignup>
          Já tem uma conta?
          <C.Strong>
            <Link to="/">Entre</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

Signup.propTypes = {
  isAuthenticated: PropTypes.bool,
  email: PropTypes.string,
  emailConf: PropTypes.string,
  password: PropTypes.string,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  handleSignup: PropTypes.func,
  handleInputKeyDown: PropTypes.func,
}


export default Signup;
