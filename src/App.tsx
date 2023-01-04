import React from 'react';
import Container from 'react-bootstrap/Container';
import UserForm from './components/UserForm';
import './App.css';

function App() {
  return (
    <Container className="my-5">
      <UserForm />
    </Container>
  );
}

export default App;
