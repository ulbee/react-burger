import { TUser } from "./user";

export type TRequestRetryOptions = TUser | string | undefined;

export type TRequestRetryOnSuccess = {
  [name: string]: string;
}

export type requestRetry = (accessToken: string, options: TRequestRetryOptions) => Promise<any>;
export type requestRetryOnFail = (error: any) => void;
export type requestRetryOnSuccess = (res: any) => void;
