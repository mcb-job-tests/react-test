import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShoppingList from './ShoppingList';
import CancelShoppingListButton from './CancelShoppingListButton';
import CheckOutDialogButton from './CheckOutDialogButton';

export default class Basket extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            saleItems: this.props.saleItems,
            basketItems: [],
        };
    }

    componentDidMount() {
        this.initialiseBasketItems();
    }

    componentWillReceiveProps( nextProps ){
        if ( typeof nextProps.saleItems !== 'undefined' ) {
            this.setState({
                saleItems: nextProps.saleItems,
            });
        }

    }

    handleBasketUpdate( index, changeAmount ){

        let basketItemsArray = this.state.basketItems;

        basketItemsArray[index] = basketItemsArray[index] + changeAmount;
        this.setState({ basketItems: basketItemsArray });
    }

    initialiseBasketItems(){
        let items = [];

        this.state.saleItems.forEach((item)=>{
            items.push(0)
        });

        this.setState({basketItems: items});
    }

    handleCancelBasketListItems(){
        this.initialiseBasketItems();
    }

    handleIsDisabled() {
        let isDisabled = true;
        for (let i = 0; i < this.state.basketItems.length; i++) {
            if (this.state.basketItems[ i ] > 0) {
                isDisabled = false;
                break;
            }
        }
        return isDisabled;
    }

    handleCheckOut(){
        this.initialiseBasketItems();
    }

    render (){
        const buttonStyle = {
            margin: 12,
        };

        return(
          <div>
              < ShoppingList
                  saleItems={ this.state.saleItems }
                  basketItems={ this.state.basketItems }
                  handleBasketUpdate={ this.handleBasketUpdate.bind( this ) }
              />
              <div
                  className="flex-container"
                  style={{
                      width: '100%',
                      height: '100px',
                      flexDirection: "row",
                      justifyContent: "spaceAround",
                      alignItems: "center",

                  }}
              >
                < CancelShoppingListButton
                    className="flex-item col-5"
                    style={ buttonStyle }
                    basketItems={ this.state.basketItems }
                    isDisabledFunc={ this.handleIsDisabled.bind( this) }
                    handleCancelBasketItems={ this.handleCancelBasketListItems.bind( this ) }
                />
                < CheckOutDialogButton
                    className="flex-item col-5"
                    style={ buttonStyle }
                    isDisabledFunc={ this.handleIsDisabled.bind( this) }
                    handleCheckOutOK={ this.handleCheckOut.bind( this ) }
                    basketItems={ this.state.basketItems }
                    saleItems={ this.state.saleItems }
                />
              </div>
          </div>
        );
    }
}

Basket.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};


Basket.propTypes = {
    saleItems : PropTypes.array.isRequired
};