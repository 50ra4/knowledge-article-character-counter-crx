import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { countCharacterInChildElements, CODE_TAGS } from '../utils/count';

const getContentElement = (): HTMLElement | null =>
  document.querySelector('div#content');

const countArticle = () => {
  const elm = getContentElement();
  return !elm ? 'NOT_FOUND' : countCharacterInChildElements(elm, CODE_TAGS);
};

const Root = () => {
  const count = countArticle();
  const text = typeof count === 'number' ? `字数：${count}文字` : 'error';
  return <h1>{text}</h1>;
};

const render = () => {
  const root = document.createElement('div');
  const contentElement = getContentElement();

  if (!contentElement) {
    console.warn('not found knowledge article content!');
    return;
  }

  contentElement.parentElement?.prepend(root);
  createRoot(root).render(
    <StrictMode>
      <Root />
    </StrictMode>,
  );
};

render();
