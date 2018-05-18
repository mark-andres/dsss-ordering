import React from 'react';
import AppetizersMenu from './AppetizersMenu';
import BeerAndWineMenu from './BeerAndWineMenu';
import BeveragesMenu from './BeveragesMenu';
import DessertsMenu from './DessertsMenu';
import PastaMenu from './PastaMenu';
import PizzaMenu from './PizzaMenu';
import SaladsMenu from './SaladsMenu';
import SidesMenu from './SidesMenu';
import SliceMenu from './SliceMenu';
import SubsMenu from './SubsMenu';
import { connect } from 'react-redux';

class SelectionPanel extends React.Component {
  render() {
    const menuComponent = {
      'Appetizers': <AppetizersMenu />,
      'Beer & Wine': <BeerAndWineMenu />,
      'Beverages': <BeveragesMenu />,
      'Desserts': <DessertsMenu />,
      'Pasta': <PastaMenu />,
      'Pizza': <PizzaMenu />,
      'Salads': <SaladsMenu />,
      'Sides': <SidesMenu />,
      'Slice': <SliceMenu />,
      'Subs': <SubsMenu />
    }

    return (
      <div className="main-grid-cell selection-panel">
        {menuComponent[this.props.currentCategory.category]}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentCategory: state.menuCategories.currentCategory
});

export default connect(mapStateToProps, null)(SelectionPanel);