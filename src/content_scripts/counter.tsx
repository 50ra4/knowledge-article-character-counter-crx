import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  countCharacter,
  getTagWithTextListByChildren,
  SOURCE_CODE_TAGS,
} from '../utils/count';

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
  return typeof count === 'number' ? <h1>{`字数：${count}文字`}</h1> : null;
};

const render = () => {
  const contentElement = getContentElement();
  if (!contentElement) {
    console.warn('not found knowledge article content!');
    return;
  }

  const root = document.createElement('div');
  root.setAttribute('id', 'knowledge-character-counter');

  contentElement.parentElement?.prepend(root);
  createRoot(root).render(
    <StrictMode>
      <Root />
    </StrictMode>,
  );
};

render();
