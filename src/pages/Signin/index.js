import React, { useState, useCallback } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import PropTypes from 'prop-types';

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    if (e.target.type === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }

    setError("");
  }

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  }

  const handleLogin = useCallback(() => {
    if (!email || !password) {
        setError("Preencha todos os campos");
        return;
    }

    const res = signin(email, password);

    if (res) {
        setError(res);
        return;
    }

    navigate("/home");
  }, [email, password, signin, navigate]);

  return (
    <C.Container>
      <C.Label>SISTEMA DE LOGIN</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        {error && <C.LabelError>{error}</C.LabelError>}
        <Button Text="Entrar" onClick={handleLogin} />
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/signup">Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

Signin.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  error: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleInputKeyDown: PropTypes.func,
  handleLogin: PropTypes.func,
}

export default Signin;
