import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class SalesItem extends Component {

    constructor( props, context ) {
        super( props, context );
        this.state = {
            index : this.props.index,
            itemName: this.props.itemName,
            basketItems: this.props.basketItems,
            quantitySold : 0,
        };
    }

    componentWillReceiveProps( nextProps ){
        if ( typeof nextProps.index !== 'undefined' ) {
            this.setState({
                index: nextProps.index,
            });
        }
        if ( typeof nextProps.itemName !== 'undefined' ) {
            this.setState({
                itemName: nextProps.itemName,
            });
        }
        if ( typeof nextProps.basketItems !== 'undefined' ) {
            this.setState({
                basketItems: nextProps.basketItems,
            });
        }
    }

    handleMinusTouchTap(){

        this.props.onUpdateBasket( this.state.index, -1 );
    }

    handleAddTouchTap(){

        this.props.onUpdateBasket( this.state.index, 1 );
    }

    render (){
        const style = {
            margin: 12,
        };
        const labelStyle = {
            fontSize: "1.5em"
        };
        return(
            <Card >
                <CardHeader
                    title={ this.state.itemName }
                    titleColor={ this.context.muiTheme.palette.accent3Color }
                    titleStyle={{ fontSize: "1.3em" }}
                    showExpandableButton={false}
                />
                <RaisedButton
                    label="-"
                    labelStyle={ labelStyle }
                    primary={true}
                    style={style}
                    onTouchTap={ this.handleMinusTouchTap.bind( this ) }
                    disabled={ this.state.basketItems[ this.state.index ] < 1 }
                />
                <TextField
                    id="text-field-controlled"
                    value={ this.state.basketItems[ this.state.index ] }
                    style={{
                        fontSize: "1.5em",
                        width: "100px"
                    }}
                    inputStyle={{
                        textAlign: "centre",
                        padding: "0px 50%",

                    }}
                />
                <RaisedButton
                    label="+"
                    labelStyle={ labelStyle }
                    primary={ true }
                    style={ style }
                    onTouchTap={ this.handleAddTouchTap.bind( this ) }

                />
            </Card>
        );
    }
}

SalesItem.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};


SalesItem.propTypes = {
    index: PropTypes.number.isRequired,
    itemName: PropTypes.string.isRequired,
    basketItems: PropTypes.array.isRequired,
    onUpdateBasket: PropTypes.func.isRequired,
};