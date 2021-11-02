import * as React from 'react';

interface PropsType{
  children:any;
}
class ErrorBoundary extends React.Component {
  constructor(props: PropsType) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    // this.setState({ error });
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    // Do some logging to api
    console.log(error);
  }

  render() {
    const { hasError }: any = this.state;
    // const { props }: any = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong</h1>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
