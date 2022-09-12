import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ArticleCounter } from '../components/ArticleCounter';
import {
  countCharacter,
  getTagWithTextListByChildren,
  SOURCE_CODE_TAGS,
} from '../utils/count';

const getArticleTitleWithNumber = () => {
  const doc = document.querySelector<HTMLElement>(
    '#content_head > * > h4.title',
  );
  if (!doc) {
    return undefined;
  }
  return doc.innerText;
};

const getContentElement = (): HTMLElement | null =>
  document.querySelector('div#content');

const countArticle = () => {
  const elm = getContentElement();
  if (!elm) {
    return undefined;
  }
  return countCharacter(getTagWithTextListByChildren(elm), SOURCE_CODE_TAGS);
};

const Root = () => {
  const count = countArticle();
  const onClick = () => {
    if (typeof count !== 'number') {
      return;
    }
    const titleWithNumber = getArticleTitleWithNumber();
    if (!titleWithNumber) {
      console.error('not found article title');
      return;
    }
    const text = [
      titleWithNumber,
      `${window.location.origin}${window.location.pathname}`,
      `${count}文字`,
    ].join('\n');

    if (!window?.navigator?.clipboard?.writeText) {
      console.error('cannot paste to clipboard');
      return;
    }

    window.navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('クリップボードに記事の情報を貼り付けました');
      })
      .catch(() => {
        console.error('clipboard error');
      });
  };

  return typeof count === 'number' ? (
    <button
      style={{ padding: '0', minWidth: '100%', border: 'none' }}
      onClick={onClick}
    >
      <ArticleCounter count={count} />
    </button>
  ) : null;
};

const render = () => {
  const contentElement = getContentElement();
  if (!contentElement) {
    console.warn('not found knowledge article content!');
    return;
  }

  const root = document.createElement('div');
  root.setAttribute('id', 'knowledge-character-counter');
  root.style.setProperty('margin', '4px 0');

  contentElement.parentElement?.prepend(root);
  createRoot(root).render(
    <StrictMode>
      <Root />
    </StrictMode>,
  );
};

render();
