export interface Domicilio {
  calle: string;
  numExt: number | '';
  numInt: number | '';
  codPost: number | '';
  colonia: string;
  municipio: string;
  ciudad: string;
  estado: string;
  pais: string;
}

export interface Empresa {
  correo: string;
  nombre: string;
  fechaConst: Date | '';
  domicilio: Domicilio;
  compDomicilio: File | '';
}

export interface Representante {
  correo: string;
  nombre: string;
  nacionalidad: string;
  fechaNac: Date | '';
  tel: string;
  domicilio: Domicilio;
  identificacion: File | '';
}

export default interface User {
  empresa: Empresa;
  representante: Representante;
}
