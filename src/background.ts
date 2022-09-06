import {
  SendMessageRequest,
  SendMessageRequestKey,
  SendMessageResponse,
} from './utils/message';

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
        console.log(request);
        sendResponse<typeof request.type>({
          type: 'success',
          data: {
            // FIXME: replace
            title: 'article title',
            draftNumber: 300,
            count: 500,
            updatedAt: new Date(),
          },
        });
        break;

      default:
        break;
    }
    return true;
  },
);

export {};
