import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

export default class CancelShoppingListButton extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            basketItems: this.props.basketItems,
            isDisabled: true,
        };
    }


    componentWillReceiveProps( nextProps ){
        if ( typeof nextProps.basketItems !== 'undefined' ) {
            let isDisabled = this.props.isDisabledFunc();
            this.setState({
                basketItems: nextProps.basketItems,
                isDisabled: isDisabled,
            });
        }
    }

    handleCancelBasketItems(){
        this.props.handleCancelBasketItems();
    }

    render (){
        return(
                < RaisedButton
                    className="flex-item"
                    label="CANCEL"
                    disabled={ this.state.isDisabled }
                    onTouchTap={ this.handleCancelBasketItems.bind( this ) }
                    labelStyle={{
                        fontSize: "1.2em",
                    }}
                    style={{
                        borderColor:"blue",
                        margin: 12
                    }}
                    primary={ true }
                />
        );
    }
}

CancelShoppingListButton.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};


CancelShoppingListButton.propTypes = {
    basketItems: PropTypes.array.isRequired,
    isDisabledFunc: PropTypes.func.isRequired,
    handleCancelBasketItems: PropTypes.func.isRequired,
};
