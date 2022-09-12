import React from 'react';

type Props = {
  id: string;
  name: string;
  label: string;
  readonly?: boolean;
  value?: number;
  onChange: (v?: number) => void;
};

export const InputNumber = ({
  id,
  name,
  label,
  readonly,
  value,
  onChange,
}: Props) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          marginRight: '4px',
          flex: '0 0 auto',
        }}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        style={{
          flex: '1 1 auto',
          fontSize: '14px',
          padding: '0 8px',
          height: '24px',
        }}
        type="number"
        id={id}
        name={name}
        value={value}
        readOnly={readonly}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const value =
            e.target.value.length > 0 ? Number(e.target.value) : undefined;
          onChange(value);
        }}
      />
    </div>
  );
};
