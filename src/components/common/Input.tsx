import React from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

interface InputProps {
  id: string;
  label: string;
  value: string | number;
  error: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ id: name, label, error, ...rest }: InputProps) {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...rest} />
      {error && (
        <Alert variant="danger" className="mt-1">
          {error}
        </Alert>
      )}
    </Form.Group>
  );
}

export default Input;
