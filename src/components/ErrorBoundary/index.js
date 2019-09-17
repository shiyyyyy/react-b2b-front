import React from 'react';
import Exception500 from '@/pages/Exception/500';


class ErrorBoundary extends React.Component {
    static propTypes = {
        // ErrorCom: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      // eslint-disable-next-line react/no-unused-state
      this.state = { error: false,errorInfo:''};
    }
  
    componentDidCatch(error, info) {
        this.setState({
            error,
            // eslint-disable-next-line react/no-unused-state
            errorInfo: info
        })
        console.log(JSON.stringify(info));
    }
  
    render() {
      const {error} = this.state;
      // const {ErrorCom} = this.props;
      if (error) {
        return <Exception500 />;
      }
  
      // eslint-disable-next-line react/destructuring-assignment
      return this.props.children; 
    }
  }

export default ErrorBoundary;
