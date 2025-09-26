import { AllowedTypes } from '../index';

export const getSizes = (type: AllowedTypes, size: number) => {
  switch (type) {
    default:
    case 'spinner':
      return {
        viewbox: '0 0 100 100',
        width: size,
        height: size
      };
    case 'bar':
    case 'percentage-bar':
      return {
        viewbox: '0 0 100 4'
      };
    case 'dots':
      return {
        viewbox: '0 0 80 20',
        width: size
      };
  }
};

export default getSizes;
