import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

export default class SalesReceipt extends Component {

    constructor( props, context ) {
        super( props, context );
        this.state = {
            basketItems: this.props.basketItems,
            saleItems: this.props.saleItems,

        };
    }

    componentWillReceiveProps( nextProps ){
        if ( typeof nextProps.basketItems !== 'undefined' ) {
            this.setState({
                basketItems: nextProps.basketItems,
            });
        }
        if ( typeof nextProps.saleItems !== 'undefined' ) {
            this.setState({
                saleItems: nextProps.saleItems,
            });
        }
    }

    calculateItemsValue( index ){
        let saleItem = this.state.saleItems[ index ];
        let saleQuantity = this.state.basketItems[ index ];
        let totalValue = 0;

        if ( saleItem.price.length === 2 ) {

            let offerQuantity = Math.floor( saleQuantity / saleItem.price[ 1 ].items );


            if ( offerQuantity > 0 ) {
                totalValue = offerQuantity * saleItem.price[ 1 ].cents;
                console.log("totalval(offer): " + totalValue);
                let remainder = saleQuantity % saleItem.price[ 1 ].items;
                console.log("remainder: " + offerQuantity);
                totalValue += remainder * saleItem.price[ 0 ].cents;
            } else {
                totalValue = saleQuantity * saleItem.price[ 0 ].cents;
            }

        } else {
            totalValue = saleQuantity * saleItem.price[ 0 ].cents;
        }


        return( totalValue );
    }


    renderSalesReceipt(){

        return this.state.saleItems.map( (item, index)=>{
            if ( this.state.basketItems[ index ] > 0) {
                return (
                    <div
                        key={ index }
                        className="flex-container"
                        style={{
                            margin: "20px",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "flex-start"
                        }}
                    >
                        <p className="flex-item">
                            { item.name}
                        </p>
                        <p className="flex-item">
                            { this.state.basketItems[ index ] }
                        </p>
                        <p className="flex-item">
                            { this.calculateItemsValue( index ) }
                        </p>
                    </div>
                );
            } else return('');

        });

    }

    renderSalesReceiptTotalCost(){
        let total = 0;

        for ( let i = 0; i < this.state.basketItems.length; i++ ) {
            if ( this.state.basketItems[ i ] > 0 ) {
                total += this.calculateItemsValue( i )
            }
        }


        return(
            <div className="flex-container"
                 style={{
                     margin: "20px",
                     flexDirection: "row",
                     justifyContent: "space-around",
                     alignItems: "flex-start"
                 }}>
                <p className="flex-item">
                </p>
                <p className="flex-item">
                    TOTAL :
                </p>
                <p className="flex-item">
                    { total }
                </p>
            </div>
        );
    }

    render () {
        return (
            <Paper>

                <div
                    className="flex-container"
                    style={{
                        margin: "20px",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "flex-start"
                    }}
                >
                    <p className="flex-item">Item</p>
                    <p className="flex-item">Qty</p>
                    <p className="flex-item">Value</p>
                </div>
                <hr style={{margin:"40px", borderTop: "dotted 2px"}} />
                { this.renderSalesReceipt() }
                <hr style={{margin:"40px", borderTop: "dotted 2px"}} />
                { this.renderSalesReceiptTotalCost() }
            </Paper>
        );
    }
}

SalesReceipt.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};


SalesReceipt.propTypes = {
    basketItems: PropTypes.array.isRequired,
    saleItems: PropTypes.array.isRequired,
};
