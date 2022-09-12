import { FetchDraftArticleResponse } from '../types';

type ErrorResponse = { code: string; message: string };

export class SendMessageError extends Error {
  public readonly name = 'SendMessageError';
  public readonly code: string;
  public readonly message: string;

  constructor({ code, message }: { code: string; message: string }) {
    super();
    this.code = code;
    this.message = message;
  }

  toObj(): ErrorResponse {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

export const toSendMessageErrorResponse = (error: unknown): MessageError => {
  if (error instanceof SendMessageError) {
    return {
      type: 'error',
      error: error.toObj(),
    };
  }

  return {
    type: 'error',
    error: {
      code: 'UNKNOWN',
      message: '不明なエラーが発生しました.',
    },
  };
};

type MessageError = { type: 'error'; error: ErrorResponse };
export type MessageResponse<T> = { type: 'success'; data: T } | MessageError;

export type MessageState<T> =
  | MessageResponse<T>
  | { type: 'pending' }
  | { type: 'loading' };

export type SendMessageRequest = {
  type: 'FETCH_DRAFT_ARTICLE_COUNT';
  payload: {
    draftNumber: number;
  };
};

export type SendMessageResponse = {
  FETCH_DRAFT_ARTICLE_COUNT: MessageResponse<FetchDraftArticleResponse>;
};

export type SendMessageRequestKey = keyof SendMessageResponse;
