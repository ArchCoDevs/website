import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export class ErrorBoundaryProvider extends React.Component<Props> {
  componentDidCatch(error: Error): void {
    console.error(error);
  }

  public render(): ReactNode {
    return this.props.children;
  }
}

export default ErrorBoundaryProvider;
