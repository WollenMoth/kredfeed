import React from 'react';
import Joi from 'joi';
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import Errors from '../../models/common/errors';
import Input from './Input';

export default abstract class Form<T extends object> extends React.Component {
  abstract state: {
    data: T;
    errors: Errors;
  };

  abstract schema: Joi.ObjectSchema;

  abstract doSubmit(): void;

  validate = () => {
    const options = { abortEarly: false };
    const { error } = this.schema.validate(this.state.data, options);
    if (!error) return {};

    const errors: Errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ id, value }: EventTarget & HTMLInputElement) => {
    const schema = this.schema.extract(id);

    const { error } = schema.validate(value);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({
    currentTarget: input,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { data, errors } = { ...this.state };
    const { value, valueAsNumber, id } = input;

    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[id] = errorMessage;
    else delete errors[id];

    _.set(data, id, isNaN(valueAsNumber) ? value : valueAsNumber);

    this.setState({ data, errors });
  };

  getValue = (path: string) => _.get(this.state.data, path);

  renderButton = (label: string) => (
    <Button
      variant="primary"
      disabled={Object.keys(this.state.errors).length > 0}
      type="submit"
    >
      {label}
    </Button>
  );

  renderInput = (id: string, label: string, type = 'text') => (
    <Input
      id={id}
      label={label}
      value={this.getValue(id)}
      error={this.state.errors[id]}
      type={type}
      onChange={this.handleChange}
    />
  );

  abstract render(): JSX.Element;
}