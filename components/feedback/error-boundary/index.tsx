import React, { ReactNode, ErrorInfo } from 'react';
import classNames from 'classnames';

import { Icon } from 'components/flourishes/icon';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

interface ErrorBoundaryProps {
  message?: string;
  children: ReactNode;
  forceError?: boolean;
  className?: string; // Added className prop
}

interface ErrorBoundaryState {
  hasError: boolean;
}
/**
 * The 'ErrorBoundary' component is used to catch errors in the component tree below it.
 * You can use the 'message' prop to display a custom error message.
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.props.forceError || this.state.hasError) {
      const { className, message } = this.props;
      return (
        <div className={cx(styles['error'], className)}>
          <Icon use="warning" />
          <p>{message || 'Something went wrong'}. Please try again later</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

function logErrorToMyService(error: Error, errorInfo: ErrorInfo) {
  // Implement your error logging service here
  console.error('Logging error:', error, errorInfo);
}
