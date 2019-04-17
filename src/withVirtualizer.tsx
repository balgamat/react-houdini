import * as React from 'react';
import { Waypoint } from 'react-waypoint';

const withVirtualizer = <P extends object>(
  Component: React.ComponentType<P>,
  options: { animate?: boolean; height?: number; preLoad?: number; width?: number },
): React.FC<P> => (props: P) => {
  const [shouldRender, setShouldRender] = React.useState(false);

  return (
    <div style={{opacity: shouldRender ? 1 : 0, transition: options.animate ? 'all 0.5s ease-in-out' : undefined }}>
      <Waypoint
        topOffset={+(options.preLoad || 0) * (options.height || 0)}
        bottomOffset={-(options.preLoad || 0) * (options.height || 0)}
        onEnter={() => setShouldRender(true)}
        onLeave={() => setShouldRender(false)}
      >
        {shouldRender ? (
          <Component {...props as P} />
        ) : (
          <div
            data-cy={props['data-cy'] || undefined}
            style={{
              width: options.width || 'auto',
              height: options.height || 'auto',
            }}
          />
        )}
      </Waypoint>
    </div>
  );
};

export default withVirtualizer;
