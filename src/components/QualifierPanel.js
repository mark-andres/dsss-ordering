import React from 'react';

class QualifierPanel extends React.Component {
  componentDidMount() {
    const { menuQualifiers, selectedItem } = this.props;
    if (menuQualifiers) {
      let initialPart;
      if (this.props.halfOrdering) {
        initialPart = 'h1';
      } else {
        initialPart = 'whole';
      }
      this.props.initQualifiers(menuQualifiers, initialPart);
    }
  }

  isQualifierSet(qualifierId) {
    if (qualifierId === 'prepare') {
      return false;
    }

    const { qualifiers } = this.props;
    return qualifiers[qualifierId];
  }

  toggleQualifier(qualifierId) {
    const { qualifiers, setQualifier } = this.props;

    setQualifier(qualifierId, !qualifiers[qualifierId]);
  }

  render() {
    const { menuQualifiers, halfOrdering } = this.props;
    let supportedQualifiers = menuQualifiers;
    if (menuQualifiers && halfOrdering) {
      supportedQualifiers = menuQualifiers.filter(qualifier => qualifier.id !== 'whole');
    }

    return (
      <div className="qualifier-panel">
        {!!supportedQualifiers && supportedQualifiers.map((qualifier) => {
          const qualifierWidth = 100 / supportedQualifiers.length;
          return (
            <button
              className='qualifier-button'
              key={qualifier.id}
              id={qualifier.id}
              style={{
                width: `${qualifierWidth}%`,
                backgroundColor: this.isQualifierSet(qualifier.id) ? '#3daf3b' : '#006900',
              }}
              onClick={(e) => {
                e.preventDefault();
                this.toggleQualifier(e.target.id);
              }}
            >
              {qualifier.name}
            </button>
          )
        })}
        {this.props.children}
      </div>
    )
  }
}

export default QualifierPanel;