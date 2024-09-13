export type IEndpointProvider = "V1" | "MOCK";

export type IMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export type HTTPStatusCodes =
  | 200
  | 201
  | 204
  | 400
  | 401
  | 403
  | 404
  | 405
  | 422
  | 500
  | 502
  | 503
  | 504;

export interface IData<T> {
  success: boolean;
  status?: number;
  code: HTTPStatusCodes;
  message?: string;
  data: T;
}
