'use client';

import React, { useEffect, useState } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <AddressSuggestions
      token="2049da58fa8abb8bb78d8ed5cf752bb9420a4be8"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};