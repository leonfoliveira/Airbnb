import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import api from '../../services/api';

import Logo from '../../assets/airbnb-logo.svg';

import { Form, Container } from './styles';

function SignUp({ history }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async e => {
    e.preventDefault();

    if (username.length === 0 || email.length === 0 || password.length === 0) {
      setError('Preencha todos os dados para se cadastrar');
    } else {
      try {
        await api.post('/users', { username, email, password });
        history.push('/');
      } catch (err) {
        console.log(err);
        setError('Ocorreu um erro ao registrar sua conta.');
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSignUp}>
        <img src={Logo} alt="Airbnb logo" />
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Endereço de Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Cadastrar grátis</button>
        <hr />
        <Link to="/">Fazer login</Link>
      </Form>
    </Container>
  );
}

export default withRouter(SignUp);
