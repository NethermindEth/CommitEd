import {
  LinkVertical,
  LinkVerticalStep,
  LinkVerticalLine,
} from '@visx/shape';  
import { AddSVGProps } from '@visx/shape/lib/types';

export declare type LinkComponentType = <Link, Node>({ className, innerRef, data, path, x, y, source, target, children, ...restProps }: AddSVGProps<any, SVGPathElement>) => JSX.Element;

export default function getLinkComponent({
  linkType,
}: {
  linkType: string;
}): LinkComponentType {
  let LinkComponent: LinkComponentType;
  if (linkType === 'step') {
    LinkComponent = LinkVerticalStep;
  } else if (linkType === 'line') {
    LinkComponent = LinkVerticalLine;
  } else {
    LinkComponent = LinkVertical;
  }

  return LinkComponent;
}
