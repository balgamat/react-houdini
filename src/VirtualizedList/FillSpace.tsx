import * as React from 'react';

interface FillSpacePropsType<T> {
  count: number;
  itemHeight: number;
  renderPlaceholder?: (item: T) => React.ReactNode;
  items: T[];
}

const FillSpace = ({
  count,
  items,
  renderPlaceholder,
  itemHeight,
}: FillSpacePropsType<any>) =>
  renderPlaceholder ? (
    <>{Array(count).map(renderPlaceholder)}</>
  ) : (
    <div style={{ height: count * itemHeight }} />
  );

export default FillSpace;
