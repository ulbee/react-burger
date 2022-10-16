import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
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