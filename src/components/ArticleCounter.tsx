import React from 'react';

export const ArticleCounter = ({ count }: { count: number }) => {
  return (
    <div
      style={{
        border: '1px solid #2c3e50',
        backgroundColor: '#2c3e50',
        display: 'flex',
        flex: '1 0 auto',
        justifyContent: 'center',
        color: '#ffffff',
        fontSize: '24px',
        padding: '8px 0',
      }}
    >
      記事の字数:
      <strong style={{ fontWeight: 'bold', margin: '0 4px' }}>{count}</strong>
      文字
    </div>
  );
};
