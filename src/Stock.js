import React from 'react';
import "./Stock.css"
import Button from './SmallComponents/button.js'

import { Line } from 'react-chartjs-2'

let StockSymbol2 = 'MSFT';

let counter1 = 0;
let counter2 = 0;

let stockArr = ['FB', 'MSFT', 'IBM', 'TSLA', 'AMZN'];

let stockSymbol = stockArr[0];

let stockView = 0;
let prevState = 0;

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

    setStock() {
        prevState = stockView;
        
        //this.setState({stock: stockArr[stockView]});
        stockSymbol = stockArr[stockView];
        stockView++;
        this.fetchStock();
        
        if(stockView > 4) {
            stockView = 0;
        }
        
    }

    fetchStock() {
        console.log('fetch:')
        console.log(this.stock);
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

                        if (counter1 > 20) {
                            break;
                        }

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

    fetchStock2() {
        console.log('running');
        const pointThis = this;
        const API_KEY = 'EHM4W2PU9UBUEZZ2';


        let API_Call2 = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol2}&outputsize=compact&apikey=${API_KEY}`;

        let stockChartX2ValuesFunction = [];
        let stockChartY2ValuesFunction = [];

        fetch(API_Call2)

            .then(
                function (response) {
                    return response.json();
                }
            )
            .then(
                function (data) {
                    console.log('hello');


                    counter2 = 0;
                    for (var key in data['Time Series (Daily)']) {
                        stockChartX2ValuesFunction.push(key);
                        stockChartY2ValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);

                        counter2++;

                        if (counter2 > 20) {
                            break;
                        }

                    }

                    pointThis.setState(
                        {
                            stockChartX2: stockChartX2ValuesFunction,
                            stockChartY2: stockChartY2ValuesFunction
                        }
                    );

                }
            )


    }

    render() {
        return (
            <div> Stock
                {/* <button onClick={(e) => { e.preventDefault(); this.clicked(); }} > The Button </button> */}

                <div id="stockGraph">
                    <h1> </h1>
                    <Button  stock = {stockSymbol} onClick = {this.setStock} />
                    

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
                            },
                            {
                                label: StockSymbol2,
                                data: this.state.stockChartY2,
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

                            }
                            ]
                        }}


                        options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            boxHeight: 200

                        }}

                    />

                </div>
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