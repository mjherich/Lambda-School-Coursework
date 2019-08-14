import React from 'react';
import { connect } from 'react-redux';

const Total = props => {
  return (
    <div className="content">
      <h4>Total Amount: ${props.car.price + props.additionalPrice}</h4>
    </div>
  );
};

const mapStateToProps = state => {
  console.log('car price',state.car.price)
  console.log('additional price',state.additionalPrice)
  return {
    car: state.car,
    additionalPrice: state.additionalPrice
  }
}
export default connect(mapStateToProps, {})(Total);
