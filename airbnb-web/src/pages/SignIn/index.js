import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Logo from '../../assets/airbnb-logo.svg';
import api from '../../services/api';
import { login } from '../../services/auth';

import { Form, Container } from './styles';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const handleSignIn = async e => {
    e.preventDefault();

    if (email.length === 0 || password.length === 0) {
      setError('Preencha e-mail e senha para continuar');
    } else {
      try {
        const response = await api.post('/sessions', { email, password });
        login(response.data.token);
        history.push('/app');
      } catch (err) {
        setError('Houve um problema com o login, verifique suas credenciais.');
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSignIn}>
        <img src={Logo} alt="Airbnb logo" />
        {error && <p>{error}</p>}
        <input
          type="email"
          placeholder="Endereço de email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
        <hr />
        <Link to="/signup">Criar conta grátis</Link>
      </Form>
    </Container>
  );
}

export default SignIn;
