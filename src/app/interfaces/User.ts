export interface LoginResponse {
  user: User;
  token: string;
}

export interface User {
  id: number;
  clave: string;
  tipo: string;
  nombre: string;
  username: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  password?: string;
  fechaInicioSesion?: Date;
  fechaFinSesion?: Date;
  estatus: string;
  tiempoEnLinea?: string;
}
