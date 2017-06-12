import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import SalesReceipt from './SalesReceipt';

export default class CheckOutDialogButton extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            openDialog : false,
            basketItems: this.props.basketItems,
            saleItems: this.props.saleItems,
            isDisabled: true,
        }
    };

    componentWillReceiveProps( nextProps ){
        if ( typeof nextProps.basketItems !== 'undefined' ) {
            let isDisabled = this.props.isDisabledFunc();
            this.setState({
                basketItems: nextProps.basketItems,
                isDisabled: isDisabled,
            });
        }
        if ( typeof nextProps.saleItems !== 'undefined' ) {
            this.setState({
                saleItems: nextProps.saleItems,
            });
        }
    }

    handleOpenDialog(){
        this.setState({
            openDialog: true,
        })
    }

    handleCloseDialog(){
        this.setState({
            openDialog: false,
        });
        this.props.handleCheckOutOK();
    }

    renderSalesReceipt(){
        return(
            <div>
                <SalesReceipt
                    basketItems={ this.state.basketItems }
                    saleItems={ this.state.saleItems }
                />
            </div>
        );
    }

    render (){
        const style = {
            margin: 12,
        };

        const actions = [
            < RaisedButton
                label="OK"
                primary={ true }
                onTouchTap={ this.handleCloseDialog.bind( this ) }
                className="flex-item col-5"
                style={ style }
            />,
        ];

        return(
            <div>
                < RaisedButton
                    className="flex-item"
                    label="CHECK OUT"
                    disabled={ this.state.isDisabled }
                    onTouchTap={ this.handleOpenDialog.bind( this ) }
                    labelStyle={{
                        fontSize: "1.2em",
                    }}
                    style={{
                        borderColor:"blue",
                        margin: 12
                    }}
                    primary={ true } />
                < Dialog
                    title="Check Out"
                    actions={ actions }
                    modal={ true }
                    open={ this.state.openDialog }
                    onRequestClose={ this.handleCloseDialog.bind( this ) }
                    autoDetectWindowHeight={false}
                    bodyStyle={{padding: 0, minHeight:"400px"}}
                    style={{paddingTop: 0, height: '100vh'}}
                >
                    { this.state.openDialog ? this.renderSalesReceipt() : '' }
                </ Dialog>
            </div>
        );
    }
}

CheckOutDialogButton.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};


CheckOutDialogButton.propTypes = {
    basketItems: PropTypes.array.isRequired,
    isDisabledFunc: PropTypes.func.isRequired,
    handleCheckOutOK: PropTypes.func.isRequired,
    saleItems: PropTypes.array.isRequired,
};
