export interface AuthToken {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  gender: string;
  avatar: string;
  region: number;
  state: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  token: string;
}

export interface ILocations {
  id: number;
  pid: number | null;
  name: string;
  createdAt: string;
}
export interface IGenders {
  value: string;
  label: string;
}