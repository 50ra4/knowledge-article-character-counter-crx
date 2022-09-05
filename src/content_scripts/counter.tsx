import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ArticleCounter } from '../components/ArticleCounter';
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
  return typeof count === 'number' ? <ArticleCounter count={count} /> : null;
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
