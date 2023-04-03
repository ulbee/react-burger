export type TRequestRetryOnSuccess = {
  [name: string]: string;
}

export type requestRetryOnFail = (error: any) => void;
export type requestRetryOnSuccess = (res: any) => void;
