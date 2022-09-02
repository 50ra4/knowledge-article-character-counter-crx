import React from 'react';

export const ArticleCounter = ({ count }: { count: number }) => {
  return (
    <div>
      <s>{`記事の字数：${count}文字`}</s>
    </div>
  );
};
