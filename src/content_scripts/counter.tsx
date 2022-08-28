import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const Root = () => {
  return (
    <>
      <h1>Counter Sample</h1>
    </>
  );
};

const render = () => {
  const root = document.createElement('div');
  const contentElement: HTMLElement | null =
    document.querySelector('div#content');

  if (!contentElement) {
    console.warn('not found knowledge content!');
    return;
  }

  contentElement.prepend(root);
  createRoot(root).render(
    <StrictMode>
      <Root />
    </StrictMode>,
  );
};

render();
