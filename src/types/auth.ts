export interface loginForm {
  phone: string;
  password: string;
}
export interface loginResponse {
  token: string;
  expire: number;
  refreshExpire: number;
  refreshToken: string;
}
