import { ComponentType } from 'react';
import {
  LinkVertical,
  LinkVerticalStep,
  LinkVerticalLine,
} from '@visx/shape';

export default function getLinkComponent({
  linkType,
}: {
  linkType: string;
}): ComponentType<any> {
  let LinkComponent: ComponentType<any>;

  if (linkType === 'step') {
    LinkComponent = LinkVerticalStep;
  } else if (linkType === 'line') {
    LinkComponent = LinkVerticalLine;
  } else {
    LinkComponent = LinkVertical;
  }

  return LinkComponent;
}
