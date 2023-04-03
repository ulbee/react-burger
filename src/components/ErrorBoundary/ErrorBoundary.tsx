import React, { ErrorInfo, ReactNode } from "react";

type TErrorProps = {
  children?: ReactNode;
}

type TErrorState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<TErrorProps, TErrorState> {
  constructor(props: TErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log("Произошла ошибка.", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section>
          <h1>Что-то пошло не так</h1>
          <p>
            Произошла ошибка. Пожалуйста, перезагрузите страницу или попробуйте позже.
          </p>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
