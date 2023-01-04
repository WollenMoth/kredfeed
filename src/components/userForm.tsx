import * as React from 'react';
import Joi from 'joi';
import BootstrapForm from 'react-bootstrap/Form';
import Form from './common/Form';
import User, { Domicilio, Empresa, Representante } from '../models/user';
import Errors from '../models/common/errors';

const newDomicilio: Domicilio = {
  calle: '',
  numExt: '',
  numInt: '',
  codPost: '',
  colonia: '',
  municipio: '',
  ciudad: '',
  estado: '',
  pais: '',
};

export default class UserForm extends Form<User> {
  state: { data: User; errors: Errors } = {
    data: {
      empresa: {
        correo: '',
        nombre: '',
        fechaConst: '',
        domicilio: newDomicilio,
        compDomicilio: '',
      },
      representante: {
        correo: '',
        nombre: '',
        nacionalidad: '',
        fechaNac: '',
        tel: '',
        domicilio: newDomicilio,
        identificacion: '',
      },
    },
    errors: {},
  };

  doSubmit = () => {
    console.log('Submitted');
  };

  private domicilioSchema = Joi.object<Domicilio>({
    calle: Joi.string().min(3).max(50).required(),
    numExt: Joi.number().min(1).max(99999).required(),
    numInt: Joi.number().min(1).max(99999).required(),
    codPost: Joi.number().min(1).max(99999).required(),
    colonia: Joi.string().min(3).max(50).required(),
    municipio: Joi.string().min(3).max(50).required(),
    ciudad: Joi.string().min(3).max(50).required(),
    estado: Joi.string().min(3).max(50).required(),
    pais: Joi.string().min(3).max(50).required(),
  });

  private empresaSchema = Joi.object<Empresa>({
    correo: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    nombre: Joi.string().min(3).max(50).required(),
    fechaConst: Joi.date().required(),
    domicilio: this.domicilioSchema.required(),
    compDomicilio: Joi.required(),
  });

  private representanteSchema = Joi.object<Representante>({
    correo: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    nombre: Joi.string().min(3).max(50).required(),
    nacionalidad: Joi.string().min(3).max(50).required(),
    fechaNac: Joi.date().required(),
    tel: Joi.string().length(10).required(),
    domicilio: this.domicilioSchema.required(),
    identificacion: Joi.required(),
  });

  schema = Joi.object({
    empresa: this.empresaSchema.required(),
    representante: this.representanteSchema.required(),
  });

  public render() {
    type InputProps = [string, string, string?];

    const domicilioInputs = (prefix: string): InputProps[] => [
      [`${prefix}.domicilio.calle`, 'Calle'],
      [`${prefix}.domicilio.numExt`, 'Número Exterior', 'number'],
      [`${prefix}.domicilio.numInt`, 'Número Interior', 'number'],
      [`${prefix}.domicilio.codPost`, 'Código Postal', 'number'],
      [`${prefix}.domicilio.colonia`, 'Colonia'],
      [`${prefix}.domicilio.municipio`, 'Municipio'],
      [`${prefix}.domicilio.ciudad`, 'Ciudad'],
      [`${prefix}.domicilio.estado`, 'Estado'],
      [`${prefix}.domicilio.pais`, 'País'],
    ];

    const empresaInputs: InputProps[] = [
      ['empresa.correo', 'Correo', 'email'],
      ['empresa.nombre', 'Nombre'],
      ['empresa.fechaConst', 'Fecha de Constitución', 'date'],
      ...domicilioInputs('empresa'),
      ['empresa.compDomicilio', 'Comprobante de Domicilio', 'file'],
    ];

    const representanteInputs: InputProps[] = [
      ['representante.correo', 'Correo', 'email'],
      ['representante.nombre', 'Nombre'],
      ['representante.nacionalidad', 'Nacionalidad'],
      ['representante.fechaNac', 'Fecha de Nacimiento', 'date'],
      ['representante.tel', 'Teléfono', 'tel'],
      ...domicilioInputs('representante'),
      ['representante.identificacion', 'Identificación', 'file'],
    ];

    return (
      <React.Fragment>
        <h1>Formulario de Usuario</h1>
        <BootstrapForm onSubmit={this.handleSubmit}>
          <h2>Empresa</h2>
          {empresaInputs.map((input) => this.renderInput(...input))}
          <h2>Representante</h2>
          {representanteInputs.map((input) => this.renderInput(...input))}
          {this.renderButton('Enviar')}
        </BootstrapForm>
      </React.Fragment>
    );
  }
}
