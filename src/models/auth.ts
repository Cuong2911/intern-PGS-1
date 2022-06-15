export interface ILoginParams {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ILoginValidation {
  email: string;
  password: string;
}
export interface ISignupParams {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  gender: string;
  region?: number;
  state?: number;
}