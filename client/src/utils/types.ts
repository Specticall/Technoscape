export type SuccessResponse<T> = {
  status: number;
  data: T;
};

export type ErrorResponse = {
  status: number;
  message: string;
};
