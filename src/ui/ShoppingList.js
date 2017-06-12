import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Subheader from 'material-ui/Subheader';
import { List } from 'material-ui/List';
import SalesItem from './SalesItem';


export default class ShoppingList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            saleItems: this.props.saleItems,
            basketItems: this.props.saleItems,
        };
    }

    componentWillReceiveProps( nextProps ){
        if ( typeof nextProps.saleItems !== 'undefined' ) {
            this.setState({
                saleItems: nextProps.saleItems,
            });
        }
        if ( typeof nextProps.basketItems !== 'undefined' ) {
            this.setState({
                basketItems: nextProps.basketItems,
            });
        }
    }

    renderSaleItemList( saleItems ){

        return saleItems.map( (item, index) => (
            <SalesItem
                key={ index }
                index={ index }
                itemName={ item.name }
                basketItems={ this.state.basketItems }
                onUpdateBasket={ this.props.handleBasketUpdate }
            />
        ));


    }

    render (){
        return(
            <div>
                <List>
                    <Subheader
                        style={{
                            fontSize: "200%",
                            color: this.context.muiTheme.palette.accent1Color,
                            borderBottomWidth: "2px",
                            borderBottomStyle: "solid",
                            width: "60%",
                            margin: "0px auto"
                        }}
                    >
                        Shopping List
                    </Subheader>
                    { this.renderSaleItemList( this.state.saleItems ) }
                </List>
            </div>
        );
    }
}

ShoppingList.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};


ShoppingList.propTypes = {
    basketItems: PropTypes.array.isRequired,
    saleItems: PropTypes.array.isRequired,
    handleBasketUpdate: PropTypes.func.isRequired,
};
