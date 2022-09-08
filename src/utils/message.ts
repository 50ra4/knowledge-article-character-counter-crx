import { FetchDraftArticleResponse } from '../types';

type MessageError = { code: string; message: string };

export class SendMessageError extends Error {
  public readonly name = 'SendMessageError';
  public readonly code: string;
  public readonly message: string;

  constructor({ code, message }: { code: string; message: string }) {
    super();
    this.code = code;
    this.message = message;
  }

  toObj(): MessageError {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

export const toSendMessageResponse = (
  error: unknown,
): { type: 'error'; error: MessageError } => {
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

export type MessageResponse<T> =
  | { type: 'success'; data: T }
  | { type: 'error'; error: MessageError };

export type MessageState<T> =
  | MessageResponse<T>
  | { type: 'pending' }
  | { type: 'loading' };

export type SendMessageRequest = {
  type: 'FETCH_DRAFT_ARTICLE_COUNT';
  payload: {
    id: number;
  };
};

export type SendMessageResponse = {
  FETCH_DRAFT_ARTICLE_COUNT: MessageResponse<FetchDraftArticleResponse>;
};

export type SendMessageRequestKey = keyof SendMessageResponse;
