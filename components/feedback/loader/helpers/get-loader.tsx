import { AllowedTypes } from '../index';

import styles from '../styles.module.scss';

export const getLoader = (type: AllowedTypes, progress: number) => {
  switch (type) {
    case 'dots':
      return (
        <>
          <g transform="translate(10 10)">
            <circle cx="0" cy="0" r="10">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.75s"
                calcMode="spline"
                keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                values="0;1;0"
                keyTimes="0;0.5;1"
                dur="1.5s"
                repeatCount="indefinite"
              ></animateTransform>
            </circle>
          </g>
          <g transform="translate(30 10)">
            <circle cx="0" cy="0" r="10">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.5s"
                calcMode="spline"
                keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                values="0;1;0"
                keyTimes="0;0.5;1"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
          <g transform="translate(50 10)">
            <circle cx="0" cy="0" r="10">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.25s"
                calcMode="spline"
                keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                values="0;1;0"
                keyTimes="0;0.5;1"
                dur="1.5s"
                repeatCount="indefinite"
              ></animateTransform>
            </circle>
          </g>
          <g transform="translate(70 10)">
            <circle cx="0" cy="0" r="10">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="0s"
                calcMode="spline"
                keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                values="0;1;0"
                keyTimes="0;0.5;1"
                dur="1.5s"
                repeatCount="indefinite"
              ></animateTransform>
            </circle>
          </g>
        </>
      );
    case 'bar':
      return (
        <>
          <rect className={styles['bar']} width="50%" height="4">
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              path="M-100,0 L100,0"
            />
            <animate
              attributeName="width"
              values="40;70;40"
              dur="2s"
              repeatCount="indefinite"
            />
          </rect>
        </>
      );
    case 'percentage-bar':
      return (
        <>
          <rect
            data-testid="percentage-bar"
            width={`${progress}%`}
            height="4"
          />
        </>
      );
    case 'spinner':
    default:
      return (
        <>
          <path
            d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="5s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            ></animateTransform>
          </path>
        </>
      );
  }
};

export default getLoader;
