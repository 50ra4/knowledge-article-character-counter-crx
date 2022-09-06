import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FetchDraftArticleResponse } from './types';
import {
  MessageState,
  SendMessageRequestKey,
  MessageResponse,
} from './utils/message';

const Root = () => {
  const [response, setResponse] = useState<
    MessageState<FetchDraftArticleResponse>
  >({
    type: 'pending',
  });

  const onClick = () => {
    setResponse({ type: 'loading' });

    chrome.runtime.sendMessage<
      SendMessageRequestKey,
      MessageResponse<FetchDraftArticleResponse>
    >('FETCH_DRAFT_ARTICLE_COUNT', (res) => {
      console.log(res);
      setResponse(res);
    });
  };

  return (
    <div
      style={{
        width: '320px',
        height: '320px',
      }}
    >
      {response.type === 'loading' ? (
        <div>取得中...</div>
      ) : response.type === 'success' ? (
        <div>{response.data.title}</div>
      ) : (
        <button onClick={onClick}>編集中の記事の文字数を取得する</button>
      )}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
