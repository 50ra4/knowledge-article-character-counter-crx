import { FetchDraftArticleResponse } from './types';
import {
  MessageResponse,
  SendMessageRequest,
  SendMessageRequestKey,
  SendMessageResponse,
  SendMessageError,
  toSendMessageResponse,
} from './utils/message';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const executeScript = async <F extends (...args: any[]) => any>(
  tabId: number,
  asyncFn: F,
) => {
  const response = await chrome.scripting.executeScript({
    target: { tabId },
    func: asyncFn,
  });
  const [head] = response;
  return head.result as ReturnType<F>;
};

const fetchKnowledgeDraftPageTabs = async (id: number) =>
  await chrome.tabs.query({
    // https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/Match_patterns
    url: `*://*/*protect.draft/view/${id}`,
  });

const isSelectedPreviewTab = () => {
  // documentからaタグの全てを取得する
  const anchors = Array.from(document.getElementsByTagName('a'));

  const previewTab = anchors.find((a) =>
    // url全体を含むようなので、endsWith
    a.href.endsWith('#previewTab'),
  );
  return !previewTab
    ? false
    : previewTab.getAttribute('aria-expanded') === 'true';
};

const fetchDraftArticleCount = async (
  id: number,
): Promise<MessageResponse<FetchDraftArticleResponse>> => {
  const tabs = await fetchKnowledgeDraftPageTabs(id);
  if (!tabs.length) {
    throw new SendMessageError({
      code: 'NOT_FOUND',
      message: `#${id}の下書き記事を表示しているタブがありません.`,
    });
  }

  if (tabs.length > 1) {
    throw new SendMessageError({
      code: 'MULTIPLE_TABS',
      message: `#${id}の下書き記事は複数のタブで表示されています.表示中のタブを1つにしてください.`,
    });
  }

  const [tab] = tabs;
  if (!tab?.id) {
    throw Error('タブのidが存在しない.');
  }

  const isPreview = await executeScript(tab.id, isSelectedPreviewTab);
  if (!isPreview) {
    throw new SendMessageError({
      code: 'NOT_PREVIEW',
      message: `プレビューを表示している#${id}の下書き記事がありません.プレビュータブが選択されているかをご確認ください.`,
    });
  }

  // TODO:
  return {
    type: 'success',
    data: {
      // FIXME: replace
      title: 'article title',
      draftNumber: 300,
      count: 500,
      updatedAt: new Date().toISOString(),
    },
  };
};

chrome.runtime.onMessage.addListener(
  (
    request: SendMessageRequest,
    _,
    sendResponse: <K extends SendMessageRequestKey>(
      res: SendMessageResponse[K],
    ) => void,
  ) => {
    switch (request.type) {
      case 'FETCH_DRAFT_ARTICLE_COUNT':
        fetchDraftArticleCount(request.payload.id)
          .then((res) => {
            sendResponse(res);
          })
          .catch((error) => {
            // TODO: remove console.log
            console.error(error);
            sendResponse(toSendMessageResponse(error));
          });
        break;

      default:
        break;
    }
    return true;
  },
);

export {};
