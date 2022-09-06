import { FetchDraftArticleResponse } from '../types';

export type MessageResponse<T, E extends Error = Error> =
  | { type: 'success'; data: T }
  | { type: 'error'; error: E };

export type MessageState<T, E extends Error = Error> =
  | MessageResponse<T, E>
  | { type: 'pending' }
  | { type: 'loading' };

export type SendMessageRequestKey = 'FETCH_DRAFT_ARTICLE_COUNT';

export type SendMessageRequest = {
  type: 'FETCH_DRAFT_ARTICLE_COUNT';
  // payload: {};
};

export type SendMessageResponse = {
  FETCH_DRAFT_ARTICLE_COUNT: MessageResponse<FetchDraftArticleResponse>;
};
