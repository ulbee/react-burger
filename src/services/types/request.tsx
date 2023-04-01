import { TUser } from "./user";

export interface IGetUserOptions {
  accessToken?: string;
}

export interface IEditUserOptions {
  accessToken?: string;
  user?: TUser;
}

export interface ILogoutUserOptions {
  token?: string;
}

export type TRequestRetryOptions = IGetUserOptions | IEditUserOptions | ILogoutUserOptions;

export type TRequestRetryOnSuccess = {
  [name: string]: string;
}

export type requestRetry = (options: any) => Promise<any>;
export type requestRetryOnFail = (error: any) => void;
export type requestRetryOnSuccess = (res: any) => void;
