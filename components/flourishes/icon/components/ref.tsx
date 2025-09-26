import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Ref = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
        fill={fill}
        {...props}
        ref={ref}
      >
        <g clipPath="url(#b)">
          <g>
            <path
              d="M3.65,15v-6.44h2.74c.69,0,1.19.06,1.5.18.31.11.56.32.75.62s.28.63.28,1.02c0,.48-.14.88-.43,1.2-.28.31-.71.51-1.27.59.28.16.51.34.69.54.18.2.43.54.74,1.05l.79,1.26h-1.56l-.94-1.4c-.33-.5-.56-.82-.69-.94-.12-.13-.25-.22-.39-.27-.14-.05-.36-.07-.65-.07h-.26v2.69h-1.3ZM4.96,11.28h.96c.62,0,1.01-.03,1.17-.08.16-.05.28-.14.36-.27.09-.13.13-.29.13-.48,0-.22-.06-.39-.18-.52-.11-.13-.28-.22-.49-.25-.11-.01-.42-.02-.95-.02h-1.02v1.63ZM10.15,15v-6.44h4.78v1.09h-3.48v1.43h3.23v1.09h-3.23v1.75h3.6v1.09h-4.9ZM16.17,15v-6.44h4.42v1.09h-3.12v1.52h2.69v1.09h-2.69v2.74h-1.3Z"
              fill="#000"
              strokeWidth="0"
            />
            <path
              d="M22,20H2c-1.1,0-2-.9-2-2V4c0-1.1.9-2,2-2h20c1.1,0,2,.9,2,2v14c0,1.1-.9,2-2,2ZM2,3.5c-.28,0-.5.22-.5.5v14c0,.28.22.5.5.5h20c.28,0,.5-.22.5-.5V4c0-.28-.22-.5-.5-.5H2Z"
              fill="#000"
              strokeWidth="0"
            />
          </g>
        </g>
      </svg>
    );
  }
);

Ref.displayName = 'Ref';

export default Ref;
