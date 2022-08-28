import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

type TagName = keyof HTMLElementTagNameMap;

const getContentElement = (): HTMLElement | null =>
  document.querySelector('div#content');

const CODE_TAGS: TagName[] = ['pre'];

const countArticle = (excludedTags: TagName[]) =>
  (Array.from(getContentElement()?.children ?? []) as HTMLElement[])
    .map((elm) => ({
      tagName: elm.tagName.toLowerCase() as TagName,
      text: elm.innerText,
    }))
    .filter(({ tagName }) => !excludedTags.includes(tagName)) // 特定のタグを除く
    .reduce((acc, cur) => acc + cur.text.length, 0);

const Root = () => {
  const count = countArticle(CODE_TAGS);

  return (
    <>
      <h1>字数：{count}文字</h1>
    </>
  );
};

const render = () => {
  const root = document.createElement('div');
  const contentElement = getContentElement();

  if (!contentElement) {
    console.warn('not found knowledge content!');
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
