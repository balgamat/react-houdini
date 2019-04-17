import * as React from 'react';
import FillSpace from './VirtualizedList/FillSpace';
import useOffset from './VirtualizedList/useOffset';
import useScroll from './VirtualizedList/useScroll';

export interface VirtualizedListPropsType<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  itemHeight: number;
  renderPlaceholder?: (item: T) => React.ReactNode;
  overScan?: number;
}

const VirtualizedList = ({
  items,
  renderItem,
  renderPlaceholder,
  itemHeight,
  overScan = 3,
}: VirtualizedListPropsType<any>) => {
  const wrapperRef =  React.useRef(null);
  const maxLoaded = Math.ceil(window.innerHeight / itemHeight) + overScan;
  const [offset, adjustOffset] = useOffset(
    0,
    items.length - maxLoaded - overScan,
  );
  const endIndex = offset + maxLoaded + overScan;
  const rCount = items.length - endIndex;

  useScroll(() =>
    adjustOffset({
      setTo:
        Math.floor(
          Math.max(
            window.scrollY - (wrapperRef!.current! as HTMLDivElement).offsetTop,
            0,
          ) / itemHeight,
        ) - overScan,
    }),
  );

  return (
    <div ref={wrapperRef}>
      <FillSpace count={offset} {...{ items, renderPlaceholder, itemHeight }} />
      {items.slice(offset, endIndex).map(renderItem)}
      <FillSpace count={rCount} {...{ items, renderPlaceholder, itemHeight }} />
    </div>
  );
};

export default VirtualizedList;
