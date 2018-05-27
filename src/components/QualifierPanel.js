import React from 'react';

class QualifierPanel extends React.Component {
  render() {
    return (
      <div className="qualifier-panel">
        {this.props.children}
      </div>
    )
  }
}

export default QualifierPanel;