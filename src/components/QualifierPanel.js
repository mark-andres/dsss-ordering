import React from 'react';
import { connect } from 'react-redux';
import { loadModal } from '../actions/modal';
import { PREPARE_DIALOG } from './modals/PrepareDialog';

class QualifierPanel extends React.Component {
  componentDidMount() {
    const { menuQualifiers } = this.props;
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.menuQualifiers && nextProps.menuQualifiers !== this.props.menuQualifiers) {
      let initialPart;
      if (nextProps.halfOrdering) {
        initialPart = 'h1';
      } else {
        initialPart = 'whole';
      }
      this.props.initQualifiers(nextProps.menuQualifiers, initialPart);
    }
  }

  isQualifierSet(qualifierId) {
    if (qualifierId === 'prepare') {
      const { notes } = this.props.selectedItem;
      if (notes && notes.length >= 1) {
        return true;
      }
      return false;
    }

    const { qualifiers } = this.props;
    return qualifiers[qualifierId];
  }

  toggleQualifier(qualifierId) {
    const { qualifiers, setQualifier } = this.props;

    if (qualifierId !== 'prepare') {
      setQualifier(qualifierId, !qualifiers[qualifierId]);
    } else {
      this.props.loadModal(PREPARE_DIALOG, { prepareNotes: this.props.qualifiers.prepare });
    }
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

const mapDispatchToProps = dispatch => ({
  loadModal: (modalType, modalProps) => dispatch(loadModal(modalType, modalProps))
});

export default connect(null, mapDispatchToProps)(QualifierPanel);