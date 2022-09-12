import React, { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { InputNumber } from './components/InputNumber';
import { useChromeStorage } from './hooks/useChromeStorage';
import { FetchDraftArticleResponse } from './types';
import {
  MessageState,
  MessageResponse,
  SendMessageRequest,
} from './utils/message';

const validateDraftNumber = (v?: number) => {
  if (!v) {
    return '記事の番号を入力してください';
  }
  if (Number.isNaN(v)) {
    return '記事の番号は数字で入力してください';
  }
  if (v < 0) {
    return '記事の番号は0以上で入力してください';
  }
  return undefined;
};

const Root = () => {
  const [draftNumber, setDraftNumber] = useChromeStorage<number | undefined>(
    'draftNumber',
    undefined,
  );
  const [response, setResponse] = useState<
    MessageState<FetchDraftArticleResponse>
  >({
    type: 'pending',
  });

  const draftNumberInputError = validateDraftNumber(draftNumber);
  const errorMessage = draftNumberInputError
    ? draftNumberInputError
    : response.type === 'error'
    ? response.error.message
    : undefined;

  const definitionList = useMemo(() => {
    if (response.type !== 'success') {
      return [];
    }
    return [
      {
        term: '記事No',
        description: `${response.data.draftNumber}`,
      },
      {
        term: 'タイトル',
        description: response.data.title,
      },
      {
        term: '文字数',
        description: `${response.data.count}字`,
      },
    ];
  }, [response]);

  const onClick = () => {
    if (typeof draftNumber !== 'number') {
      return;
    }
    setResponse({ type: 'loading' });

    chrome.runtime.sendMessage<
      SendMessageRequest,
      MessageResponse<FetchDraftArticleResponse>
    >(
      { type: 'FETCH_DRAFT_ARTICLE_COUNT', payload: { draftNumber } },
      (res) => {
        setResponse(res);
      },
    );
  };

  const onChangeDraftNumber = (v?: number) => {
    setResponse({ type: 'pending' });
    setDraftNumber(v);
  };

  return (
    <div
      style={{
        width: '480px',
        height: '320px',
      }}
    >
      <InputNumber
        id="article-number"
        name="article-number"
        label="記事番号（下書き）"
        readonly={response.type === 'loading'}
        value={draftNumber}
        onChange={onChangeDraftNumber}
      />

      <button
        style={{ minWidth: '100%', padding: '8px 0', marginTop: '8px' }}
        onClick={onClick}
        disabled={response.type === 'loading' || !!draftNumberInputError}
      >
        編集中の記事の文字数を取得する
      </button>

      {response.type === 'loading' && (
        <p style={{ fontSize: '12px' }}>取得中...</p>
      )}

      {errorMessage && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#900900',
            marginTop: '8px',
            padding: '8px',
          }}
        >
          <span
            style={{ color: '#ffffff' }}
          >{`【エラー】 ${errorMessage}`}</span>
        </div>
      )}

      {!!definitionList.length && (
        <dl style={{ border: '1px solid #efefef' }}>
          {definitionList.map(({ term, description }, i) => (
            <div
              key={term}
              style={{
                display: 'flex',
                borderBottom:
                  definitionList.length !== i + 1
                    ? '1px solid #efefef'
                    : 'none',
              }}
            >
              <dt
                style={{
                  flex: '0 0 100px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  borderRight: '1px solid #efefef',
                }}
              >
                {term}
              </dt>
              <dd
                style={{
                  fontSize: '14px',
                  margin: '0',
                }}
              >
                {description}
              </dd>
            </div>
          ))}
        </dl>
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
