import React from "react";
import { Alert, Collapse } from "react-bootstrap";
class Toast extends React.Component {
  componentDidUpdate() {
    const { showing, onDismiss } = this.props;
    if (showing) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = setTimeout(onDismiss, 5000);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.dismissTimer);
  }
  render() {
    
    const { children, variant, onDismiss, showing } = this.props;
    return (
      <div style={{ position: "fixed", top: 55, right: 30 }}>
        <Alert show={showing} variant={variant} onClose={onDismiss} dismissible>
          {children}
        </Alert>
      </div>
    );
  }
}

export default Toast;
