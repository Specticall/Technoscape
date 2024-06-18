export type SuccessResponse<T> = {
  status: number;
  data: T;
};

export type ErrorResponse = {
  status: number;
  message: string;
};
export type UserMessage = {
  id: string;
  message: string;
  companyId: string;
  dateCreated: string;
};

export type AIResponse = {
  id: string;
  message: string;
  companyId: string;
  dateCreated: string;
  tone: number;
  topic: string;
  urgency: number;
};

export type ChatResponse = SuccessResponse<(AIResponse | UserMessage)[]>;
