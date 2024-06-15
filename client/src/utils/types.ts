import { SuccessResponse, ResponseChat, RequestChat } from "./types";

export type SuccessResponse<T> = {
  status: number;
  data: T;
};

export type ErrorResponse = {
  status: number;
  message: string;
};
export type RequestChat = {
  id: string;
  message: string;
  companyId: string;
  dateCreated: string;
};

export type ResponseChat = {
  id: string;
  message: string;
  companyId: string;
  dateCreated: string;
  tone: number;
  topic: string;
  urgency: number;
};
export type ChatResponse = SuccessResponse<(ResponseChat | RequestChat)[]>;
