import "./Stock.css"
import Button from '../components/small/button.js'
import React from 'react';

import { Line } from 'react-chartjs-2'

let counter1 = 0;
let days = 10;

let stockArr = ['FB', 'AAPL', 'IBM', 'TSLA', 'AMZN'];

let stockSymbol = stockArr[0];

let stockView = 0;

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            stockChartX2: [],
            stockChartY2: [],
        }
        this.stock = stockArr[0];


        this.setStock = this.setStock.bind(this);
        this.fetchStock = this.fetchStock.bind(this);
    }

    setStockState(name) {
        stockSymbol = name;
        this.fetchStock();
    }

    setStock() {

        stockSymbol = stockArr[stockView];

        this.fetchStock();

        if (stockView > 4) {
            stockView = 0;
        }

    }

    fetchStock() {
        stockView++;
        console.log('fetch:')
        const pointThis = this;
        const API_KEY = 'EHM4W2PU9UBUEZZ2';

        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`;

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

                    counter1 = 0;
                    for (var key in data['Time Series (Daily)']) {
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);

                        counter1++;

                        if (counter1 > days) {
                            break;
                        }

                    }

                    pointThis.setState(
                        {
                            stockChartXValues: stockChartXValuesFunction.reverse(),
                            stockChartYValues: stockChartYValuesFunction.reverse()
                        }
                    );

                    //console.log(stockChartXValuesFunction);
                }
            )


    }

    render() {
        return (

            <div id="stockGraph">
                <h1> Test</h1>
                {stockArr.map((stock) => (
                    <button
                        onClick={() => this.setStockState(stock)}
                        key={stock}
                    >
                        {stock}
                    </button>
                ))}
                <Button stock={stockSymbol} onClick={this.setStock} />

                <Line
                    data={{
                        labels: this.state.stockChartXValues,
                        datasets: [{
                            label: stockSymbol,
                            data: this.state.stockChartYValues,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        } ]
                    }}


                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        boxHeight: 200

                    }}

                />

            </div>

        )
    }

    componentDidMount() {
        this.fetchStock();
        //this.fetchStock2();
        //this.setStock();
    }
}



export default Stock;