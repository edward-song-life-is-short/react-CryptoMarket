import React from 'react';
import "./Stock.css"
import Plot from 'react-plotly.js';

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: []
        }
    }

    componentDidMount() {
        this.fetchStock();
    }

    fetchStock() {
        const pointThis = this;
        const API_KEY = 'EHM4W2PU9UBUEZZ2';

        console.log(pointThis);



        let StockSymbol = 'FB';
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;

        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

        fetch(API_Call)
            .then(
                function (response) {
                    return response.json();
                }
            )
            .then(
                function (data) {
                    console.log(data);

                    for (var key in data['Time Series (Daily)']) {
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                    }

                    pointThis.setState(
                        {
                            stockChartXValues: stockChartXValuesFunction,
                            stockChartYValues: stockChartYValuesFunction
                        }
                    );
                    //console.log(stockChartXValuesFunction);
                }
            )
    }

    render() {
        return (
            <div> Stock

                <Plot
                    data={[
                        {
                            x: this.state.stockChartXValues,
                            y: this.state.stockChartYValues,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'red' },
                        },
                    ]}
                    layout={{ width: 1920, height: 1080, title: 'A Fancy Plot' }}
                />

            </div>
        )
    }
}

export default Stock;