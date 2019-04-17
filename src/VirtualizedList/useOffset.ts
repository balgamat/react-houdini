import { Dispatch, SetStateAction, useState } from 'react';

const useOffset = (
  initialOffset: number,
  maxOffset: number,
): [
  number,
  Dispatch<SetStateAction<{ setTo?: number; adjustBy?: number }>>
] => {
  const [offset, setOffset] = useState(initialOffset);
  const adjustOffset = ({
    setTo = 0,
    adjustBy,
  }: {
    setTo?: number;
    adjustBy?: number;
  }) => {
    setOffset(
      Math.min(Math.max(adjustBy ? offset + adjustBy : setTo, 0), maxOffset),
    );
  };
  return [offset, adjustOffset];
};

export default useOffset;
