import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const TwitterLogo = forwardRef<SVGSVGElement, Props>((props, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox="0 0 666.7 666.7"
    {...props}
  >
    <circle fill="#1da1f2" cx="333.3" cy="333.3" r="333.3" />
    <path
      fill="#fff"
      strokeWidth={0}
      fillRule="evenodd"
      d="M533.3,205.1c-14.7,6.5-30.5,10.9-47.1,12.9,16.9-10.2,30-26.2,36.1-45.4-15.8,9.4-33.4,16.2-52.1,19.9-15-15.9-36.3-25.9-59.9-25.9-45.3,0-82.1,36.7-82.1,82.1s.7,12.7,2.1,18.7c-68.2-3.4-128.7-36.1-169.1-85.7-7.1,12.1-11.1,26.2-11.1,41.3,0,28.5,14.5,53.6,36.5,68.3-13.5-.4-26.1-4.1-37.2-10.3v1c0,39.8,28.3,72.9,65.8,80.5-6.9,1.9-14.1,2.9-21.6,2.9s-10.4-.5-15.5-1.5c10.4,32.6,40.8,56.3,76.7,57-28.1,22-63.5,35.1-101.9,35.1s-13.2-.4-19.6-1.2c36.3,23.3,79.4,36.9,125.8,36.9,150.9,0,233.5-125,233.5-233.5s0-7.1-.2-10.6c16.1-11.6,30-26.1,41-42.5Z"
    />
  </svg>
));

TwitterLogo.displayName = 'TwitterLogo';

export default TwitterLogo;
