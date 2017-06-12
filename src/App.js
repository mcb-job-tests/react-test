import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import logo from './logo.svg';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Basket from './ui/Basket';

injectTapEventPlugin();

class App extends Component {

    constructor(){
        super();
        this.state = {
            saleItems : [
                {
                    name: 'Banana',
                    price: [
                        {
                            items: 1,
                            cents: 25,
                        }
                    ]
                },
                {
                    name: 'Orange',
                    price: [
                        {
                            items: 1,
                            cents: 30,
                        }
                    ]
                },
                {
                    name: 'Apple',
                    price: [
                        {
                            items: 1,
                            cents: 15,
                        }
                    ],
                },
                {
                    name: 'Papaya',
                    price: [
                        {
                            items: 1,
                            cents: 50,
                        },
                        {
                            items: 3,
                            cents: 100,
                        }
                    ]
                }
            ]
        }
    }

    render() {
        return (
            <Paper className="App">
                <Paper className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </Paper>
                < Basket saleItems={ this.state.saleItems }/>
            </Paper>
        );
    }
}

App.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

export default App;
